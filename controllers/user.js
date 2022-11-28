const User = require('../models/user');

exports.login = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(
    () => {
      res.status(201).json({ 
        message: 'Utilisateur connecté !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ 
        error:error
      });
    }
  );
};

exports.signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(
    () => {
      res.status(201).json({ 
        message: 'Utilisateur enregistré !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ 
        error:error
      });
    }
  );
};