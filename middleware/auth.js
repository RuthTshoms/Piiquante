//** Infos de connexion qui seront transmisent aux différentes méthodes de requêtes  */

const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
  try {
      const token = req.get('Authorization'); 
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      req.auth = { // ajout de l'id user à l'objet req. (ce qui s'apprête à être envoyé)
          userId: userId
     };
	next();
  } catch(error) {
      res.status(401).json({ error });
  }
};