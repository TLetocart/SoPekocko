# SoPekocko
Projet 6 Développeur WEB OpenClassroom / Létocart Thomas

__Installation__ : 

- Cloner le frontend depuis https://github.com/OpenClassrooms-Student-Center/dwj-projet6 (Origine du projet); et le mettre dans un dossier "frontend"
- Cloner ce projet depuis Github, et le mettre dans un dossier "api" dans le même dossier que le "frontend"

__Démarrage du site__ : 

  - Ouvrir un terminal sur le dossier Frontend, et exécuter un 'npm install' puis 'npm install node-saas'.
  - Démarrer saas avec la commande __'npm start'__.
  - Vous pouvez accéder au site depuis un navigateur avec le lien : 'http://localhost:4200'.

  __Serveur Backend__ :
  
   - Ouvrir un terminal dans le dossier 'api'.
   - Exécuter la commande __'npm install -g nodemon'__.
   - Pour lancer le serveur backend, la commande est __'nodemon serveur'__.
 
  __Dependencies__ :
  
   - Installez le dépendencies nécessaire au fonctionnement du site. Elles sont présentes dans le fichier package.json dans dependencies{}.
   - Installez les avec la commande __'npm install --save [nom]'__. Exemple : __'npm install --save bcrypt'__.
 
 __Connexion__ : 

  - Créez une base de données MongoDB et remplacez le chemin d'accès du fichier __.env.dist__ et renommez le en __.env__.
  - Pour se connecter au site, il faut créer un compte avec une adresse mail + mot de passe (6 caractères minimum, 1 Majuscule, 1 minuscule, 1 chiffre minimum).
