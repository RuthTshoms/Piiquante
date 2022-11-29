const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
  try {
      const token = req.get('Authorization');
      console.log(token);
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      req.auth = {
          userId: userId
     };
	next();
  } catch(error) {
      res.status(401).json({ error });
  }
};