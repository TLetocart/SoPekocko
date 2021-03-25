// Le package multer permet de gérer l'ajout de fichiers dans les requêtes HTTP, utilisé pour l'ajout d'image des sauces

const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du lieu de sauvegarde des fichiers 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Routes du dossier pour stocker images
  },
  
  // On créer un model de nom pour les images
  filename: (req, file, callback) => {

    let name = file.originalname.split(' ').join('_');
    let extension = MIME_TYPES[file.mimetype];
    name = name.replace("." + extension, "_");

    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({
  storage: storage
}).single('image');

