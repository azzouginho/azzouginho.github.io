// Page d'un lien FootQuiz (duel, ligue, salon, défi du jour).
//
// Si l'app est installée, Android l'ouvre directement et cette page ne
// s'affiche jamais (App Links, voir /.well-known/assetlinks.json). On arrive
// ici quand l'app n'est pas installée, ou depuis un navigateur intégré
// (Instagram, Snapchat…) qui ne passe pas la main à Android.
(function () {
  "use strict";

  var cfg = window.FOOTQUIZ || {};
  var TEXTES = {
    d: { titre: "Tu es défié en duel", action: "relever le duel" },
    l: { titre: "On t'invite dans une ligue", action: "rejoindre la ligue" },
    s: { titre: "On t'attend dans un salon", action: "rejoindre le salon" },
    j: { titre: "Le défi du jour t'attend", action: "jouer le défi du jour" },
  };
  // Même alphabet que l'app et le serveur : ni I, ni O, ni 0, ni 1.
  var CODE = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/;

  var kind = document.body.getAttribute("data-kind");
  var t = TEXTES[kind] || TEXTES.j;
  var raw = new URLSearchParams(location.search).get("c") || "";
  var code = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (kind === "j" || !CODE.test(code)) code = "";

  // L'adresse canonique : celle que l'app sait lire, copiée avant d'aller au
  // store pour retrouver l'invitation après l'installation.
  var chemin = "/" + kind + "/" + (code ? "?c=" + code : "");
  var lien = location.origin + chemin;

  function $(id) { return document.getElementById(id); }

  $("titre").textContent = t.titre;
  document.title = "FootQuiz — " + t.titre;
  if (code) {
    $("code").textContent = code;
    $("code").hidden = false;
  } else if (kind !== "j") {
    $("titre").textContent = "Ce lien n'est plus valable";
    $("intro").textContent =
      "Le code est incomplet. Demande à ton ami de te renvoyer l'invitation.";
  }

  var android = /android/i.test(navigator.userAgent);

  // « J'ai déjà FootQuiz » : depuis un navigateur intégré, l'intent force
  // l'ouverture de l'app (Android seulement).
  var ouvrir = $("ouvrir");
  if (android && (code || kind === "j")) {
    ouvrir.href =
      "intent://" + location.host + chemin +
      "#Intent;scheme=https;package=" + cfg.androidPackage + ";end";
    ouvrir.hidden = false;
  }

  // « Installer » : on copie le lien, puis on part vers le store.
  var installer = $("installer");
  if (cfg.storeUrl) {
    installer.textContent = "Installer FootQuiz pour " + t.action;
    installer.href = cfg.storeUrl;
    installer.addEventListener("click", function (e) {
      if (!navigator.clipboard) return; // le lien suit son cours
      e.preventDefault();
      navigator.clipboard.writeText(lien).catch(function () {}).then(
        function () { location.href = cfg.storeUrl; });
    });
  } else {
    installer.textContent = "Bientôt sur Google Play";
    installer.setAttribute("aria-disabled", "true");
    installer.removeAttribute("href");
    $("note").textContent =
      "FootQuiz est en test. Garde ce lien : il ouvrira directement " +
      "l'invitation une fois l'app installée.";
  }
})();
