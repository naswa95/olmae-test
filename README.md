# Kit Olmaé prêt pour GitHub Pages

Ce kit est déjà configuré avec votre URL Google Apps Script.

## Contenu du kit

- `index.html` : le site complet
- `icon.png` : icône du navigateur
- `logo_site.png` : logo affiché et lien vers la boutique
- `.nojekyll` : configuration GitHub Pages
- `Code.gs` : sauvegarde du script Apps Script sans identifiant de Google Sheets

## Mise en ligne sur GitHub

Créez un dépôt GitHub public, puis déposez exactement ces quatre fichiers à sa racine :

- `index.html`
- `icon.png`
- `logo_site.png`
- `.nojekyll`

Ne déposez pas `Code.gs` sur GitHub. Il sert uniquement de sauvegarde du code Google Apps Script.

La structure du dépôt doit être :

```text
votre-depot/
├── index.html
├── icon.png
├── logo_site.png
└── .nojekyll
```

Ensuite :

1. Ouvrez `Settings`
2. Ouvrez `Pages`
3. Choisissez `Deploy from a branch`
4. Branche : `main`
5. Dossier : `/ (root)`
6. Enregistrez

## Google Sheets

L’onglet doit s’appeler exactement :

`Réponses`

La première ligne peut contenir :

| Date | Nom | Prénom | Âge |
|---|---|---|---|

Le script utilise directement le Google Sheets depuis lequel Apps Script a été ouvert. Aucun identifiant de classeur n’est nécessaire.

## Important

L’URL de la macro est déjà intégrée dans `index.html`. Aucune modification du site n’est nécessaire.

Le logo placé en bas redirige vers :

https://www.olmae.com/
