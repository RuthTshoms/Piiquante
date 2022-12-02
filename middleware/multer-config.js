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
    const extension = MIME_TYPES[file.mimetype]; // élément du dictionnaire correspondant au mimetype de l'image envoyée par le frontend
    callback(null, name + Date.now() + '.' + extension); // si pas d'err, création du filename entier. Date.now = timestamp (rend le fichier unique)
  }
});

module.exports = multer({storage: storage}).single('image');