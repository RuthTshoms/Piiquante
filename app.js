const express = require('express'); // framework qui permet le déploiement de l'API plus rapidement
const bodyParser = require('body-parser'); // module node qui stocke les données des req POST en objets javascript, accesiblent via req.body
const mongoose = require('mongoose'); // permet l'utilisation des fonctionnalités du module 

//** Importation de nos routeurs */
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//** Accès au "path" du serveur - permet de traiter les req vers la roue /images */
const path = require('path');


const app = express(); // appel d'express - création de l'application express 

//** Connexion de l'API à la base de donnée MongoDB grâce au module mongoose */
mongoose.connect('mongodb+srv://RuthTshoms:eE0ri1hP6IABCwTV@cluster0.zkucozn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//const cors = require('cors'); 
//app.use(cors()); // autoriser les requêtes multi origines, empêche les erreurs CORS sur la route /sauces


//** Middleware autorisant la communication de plusieurs origines entre elles. Empêche les erreurs de CORS, qui défaut bloque les apples HTTP entre diff serveurs   */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // authoriser l'accès à notre API depuis n'importe quelle origines 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // envoyer ces headers aux req envoyées à l'API 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // méthodes de req authorisées
  next();
});


//** Middleware qui analyse les req JSON entrantes, accessiblent via req.body */ // pareil que body-parser ? 
//app.use(express.json()); // appel  bonne place ? au dessus des cors ?

// app.use(bodyParser.json()); // ???


//** Préciser quel routeur s'applique à quelle route  */
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
// indique à express qu'il faut gérer la ress image de manière statique à chaque fois qu'elle reçoit une req vers la route /image 
app.use('/images', express.static(path.join(__dirname, 'images'))); 

module.exports = app; // exportation du module "app"