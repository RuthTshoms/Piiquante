const express = require('express'); // framework qui permet le déploiement de l'API plus rapidement
const router = express.Router(); // fonction qui permet de créer un nouvel objet Router 
const auth = require('../middleware/auth'); // importation du middleware qui permet l'authentification d'un utilisateur 
const multer = require('../middleware/multer-config'); // importation du middleware qui gère les fichiers entrants 

const sauceCtrl = require('../controllers/sauce'); 

//** Préciser la fonction de chaque route */
//** Lister les routes disponibles à quelles points de terminaisons et pour quelles fonctions et controllers  */
router.get('/', auth, sauceCtrl.getAllSauces); 
router.post('/', auth, multer, sauceCtrl.createSauce); 
//router.get('/:id', sauceCtrl.getOneSauce);
//router.post('/')


module.exports = router;