# azzouginho.github.io — les liens de FootQuiz

Site statique servi par GitHub Pages. Il porte les **liens partagés** du jeu
(C9) : quand quelqu'un touche un lien FootQuiz, Android ouvre l'app si elle
est installée ; sinon cette page garde l'invitation et renvoie vers le store.

| Adresse | Ouvre |
|---|---|
| `/d/?c=CODE` | un duel |
| `/l/?c=CODE` | une ligue |
| `/s/?c=CODE` | un salon |
| `/j/` | le défi du jour (lien des grilles partagées) |

La forme `/d/CODE` marche aussi (redirigée par `404.html`) : c'est celle
qu'on prendra le jour où le jeu aura son propre domaine.

## Ce qu'il faut savoir

- **`.nojekyll`** doit rester : sans lui, GitHub Pages ignore le dossier
  `.well-known`, et Android ne vérifie plus les liens.
- **`/.well-known/assetlinks.json`** dit à Android que ce site appartient à
  l'app `com.azzouginho.footquiz.footquiz`. Il liste l'empreinte SHA-256 du
  certificat qui signe l'app. Aujourd'hui : la clé de débogage d'Enzo (qui
  signe aussi les APK « release » tant qu'il n'y a pas de clé de
  publication). **Le jour où l'app est sur Google Play**, ajouter la
  deuxième empreinte : Play Console → *Intégrité de l'application* →
  *Signature de l'application* → « Certificat de la clé de signature
  d'application », ligne SHA-256, à ajouter dans la liste
  `sha256_cert_fingerprints`.
- **iOS** (`apple-app-site-association`) : pas encore, il faut l'identifiant
  d'équipe Apple (compte développeur, phase 2).
- **`assets/config.js`** : l'adresse de la fiche Google Play, à remplir quand
  elle existe. Rien d'autre à toucher.
- Aucune statistique, aucun cookie, aucune ressource externe : la page ne
  contacte que GitHub.
