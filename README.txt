# FruitVideo AI — connexion Magic Hour

## Prérequis
- Node.js 20 ou plus récent
- Une clé API Magic Hour créée dans https://magichour.ai/developer

## Installation
1. Décompresse ce dossier sur un ordinateur ou un hébergement Node.js.
2. Dans le dossier, lance `npm install`.
3. Copie `.env.example` vers `.env`.
4. Ouvre `.env` et remplace la valeur de `MAGIC_HOUR_API_KEY` par ta clé secrète.
5. Lance `npm start`.
6. Ouvre `http://localhost:3000`.

Ne mets jamais la clé API dans `public/index.html`, dans une capture d'écran ou dans un dépôt public.

## Ce que fait cette version
Le bouton envoie le texte à ton serveur. Le serveur appelle le point d'accès officiel Magic Hour `POST /v1/text-to-video` avec LTX-2.5, 3 secondes, 480p et le format choisi. La réponse du fournisseur est affichée à l'écran. La création vidéo est asynchrone : ouvre https://magichour.ai/my-library pour suivre le projet et télécharger le rendu.

## Important
- Chaque demande peut consommer des crédits. Vérifie le coût et le solde dans ton compte avant de multiplier les essais.
- Cette version lance un clip à partir de l'histoire entière ; elle ne monte pas encore plusieurs clips en un film.
- Pour que le site soit accessible à tous sur Internet, déploie le serveur sur un hébergeur Node.js et configure `MAGIC_HOUR_API_KEY` comme variable secrète dans les paramètres de l'hébergeur.
