//** Infos de connexion qui seront transmisent aux différentes méthodes de requêtes  */

const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      req.auth = { userId: userId }; // ajout de l'id user à l'objet req. (ce qui s'apprête à être envoyé)
      if (req.body.userId && req.body.userId === userId) {
        throw 'Id utilisateur invalide !';
      } else {
          next();
        }
} catch {
      res.status(401).json({error: new Error('Requête invalide !')});
  }
};

