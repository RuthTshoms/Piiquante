const jwt = require('jsonwebtoken'); // importation du package jsonwebtoken
 
//** Extraction et vérification des infos contenues dans le token, et transmissions aux autres middlewares ou gestionnaires de route */
module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      req.auth = { userId: userId }; // ajout de l'userId (champs: valeur) à l'objet crée req.auth, qui sera envoyé aux routes concernée
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Id utilisateur invalide !'; // renvoie un message d'erreur 
      } else {
          next();
        }
} catch {
      res.status(401).json({error: new Error('Requête invalide !')}); // renvoie un objet erreur 
  }
};

