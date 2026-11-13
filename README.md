# BEASTWARS — Site web

Site statique HTML/CSS/JavaScript, prévu pour Cloudflare Pages avec GitHub. Le système de commentaires utilise une Cloudflare Pages Function et une base D1.

## 1. Mettre le site sur GitHub

1. Crée un dépôt GitHub.
2. Ajoute tous les fichiers et dossiers de ce projet à la racine du dépôt (`index.html`, `styles.css`, `app.js`, `config.js`, `assets/`, `functions/`, etc.).
3. Fais un commit.

## 2. Déployer sur Cloudflare Pages

1. Ouvre https://dash.cloudflare.com/
2. Va dans **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Connecte GitHub et choisis le dépôt.
4. Paramètres de build :
   - Framework preset : `None`
   - Build command : laisser vide
   - Build output directory : `/` ou `.` selon l'interface
   - Production branch : `main`
5. Déploie. Le site sera publié sur une adresse `*.pages.dev`.

À chaque commit sur la branche `main`, Cloudflare reconstruira/redéploiera le site.

## 3. Activer les commentaires avec Cloudflare D1

Les commentaires ne fonctionneront qu'après la configuration D1.

1. Dans Cloudflare, ouvre **Workers & Pages** > **D1 SQL Database** (ou **Storage & databases** > **D1**).
2. Crée une base de données, par exemple `beastwars-db`.
3. Ouvre l'éditeur SQL de cette base et exécute le contenu de `schema.sql`.
4. Ouvre ton projet Pages > **Settings** > **Functions**.
5. Dans **D1 database bindings**, ajoute un binding :
   - Variable name : `DB`
   - D1 database : `beastwars-db`
6. Enregistre puis redéploie le projet.

L'API est fournie par `functions/api/comments.js` :
- `GET /api/comments` : récupère les 50 derniers commentaires.
- `POST /api/comments` : publie un commentaire.

Le pseudo est limité à 24 caractères et le message à 500 caractères. Le navigateur affiche le texte comme du texte brut, pas comme du HTML.

### Limites et modération

Cette version publie les commentaires automatiquement. Elle inclut une validation de longueur et un champ piège anti-spam, mais ce n'est pas une protection anti-abus complète. Avant une ouverture publique importante, ajoute une protection anti-spam (par exemple Cloudflare Turnstile), une limitation de fréquence côté serveur et une fonction d'administration/modération protégée. Ne mets jamais de secret administrateur dans `app.js` ou dans un fichier public.

## 4. Modifier les liens et l'icône du jeu

Ouvre `config.js` :

```js
window.BEASTWARS_CONFIG = {
  robloxUrl: "https://www.roblox.com/games/ID-DE-TON-JEU",
  socials: {
    discord: "https://discord.gg/TON-INVITATION",
    x: "https://x.com/TON-COMPTE",
    youtube: "https://youtube.com/@TON-CHAINE"
  },
  gameIcon: "assets/mon-icone.png",
  developmentProgress: 35
};
```

Pour remplacer l'icône :
1. Ajoute ton image dans `assets/`, par exemple `mon-icone.png`.
2. Mets `gameIcon: "assets/mon-icone.png"` dans `config.js`.
3. Commit les changements.

Tu peux aussi remplacer `assets/game-icon.svg` directement. Cette icône est utilisée comme logo du site et icône d'onglet.

## 5. Modifier le contenu

- Animaux, raretés, prix et pouvoirs : tableau `animals` dans `app.js`.
- Œufs et probabilités : tableau `eggs` dans `app.js`.
- Game Passes : tableau `passes` dans `app.js`.
- Roadmap : tableau `roadmap` dans `app.js`.
- Progression : `developmentProgress` dans `config.js`.
- Style : `styles.css`.

## 6. Pages légales

`mentions-legales.html` et `confidentialite.html` sont des modèles à compléter. Remplace les champs entre crochets et adapte la politique aux traitements réellement effectués. Ne publie pas de fausses coordonnées ou de fausses déclarations.

## 7. Domaine personnalisé

Tu peux d'abord utiliser gratuitement le sous-domaine `nom-du-projet.pages.dev`. Pour utiliser un domaine comme `beastwars.org`, il faut généralement acheter le domaine, puis l'ajouter dans Pages > Custom domains.

## Structure

```text
beastwars-site/
├── index.html
├── styles.css
├── app.js
├── config.js
├── schema.sql
├── README.md
├── mentions-legales.html
├── confidentialite.html
├── assets/
│   └── game-icon.svg
└── functions/
    └── api/
        └── comments.js
```
