const bcrypt = require('bcrypt'); // module node qui permet de hasher les mots de passe 
const jwt = require('jsonwebtoken'); // package qui permet de créer et vérifier les tokens d'authentification 

const User = require('../models/user'); // importation du schéma de données pour les users

//** Enregistrement d'un nouvel utilisateur dans la base de données */
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // fonction hash du package de chiffrement "bcrypt" sur le mdp renseigné, avec "salage" du mdp 10 fois (augmentation de la sécurité) 
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error })); 
    })
    .catch(error => res.status(500).json({ error })); // erreur serveur (ne peut pas répondre à la req)
};

//**  */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

