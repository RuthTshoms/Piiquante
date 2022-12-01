//** Configuration de multer, gestionnaire de fichiers entrants */

const multer = require('multer');

// Dictionnaire d'extensions d'images //
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de multer //
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => { // où enregistrer les fichiers
    callback(null, 'images'); // (pas d'erreur, nom du dossier)
  },
  filename: (req, file, callback) => { // quel nom de fichier utiliser
    const name = file.originalname.split(' ').join('_'); // supp des espaces et ajout de _ sur le nom d'origine du fichier 
    const extension = MIME_TYPES[file.mimetype]; // application d'une extension au fichier 
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');