const bcrypt = require('bcrypt'); // module node qui permet de hasher les mots de passe 
const jwt = require('jsonwebtoken'); // package qui permet de créer et vérifier les tokens d'authentification 

const User = require('../models/user'); // importation du schéma de données pour les users


//** Création d'un nouvel utilisateur et enregistrement dans la base de données */
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // fonction hash du package de chiffrement "bcrypt" sur le mdp passé par le frontend, hashage/cryptage/salage 10 fois (augmentation de la sécurité) 
    .then(hash => {
      const user = new User({ // création du nouveau user sur base du modele mongoose 
        email: req.body.email,
        password: hash
      });
      user.save() // enregistrement dans la bdd
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error })); 
    })
    .catch(error => res.status(500).json({ error })); // erreur serveur (ne peut pas répondre à la req). => celle du hash
};


//** Connection d'un utilisateur déja enregistré dans la bdd et envoi d'un nouveau token par le serveur au frontend  */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // vérifie dans la bdd si le mail passé par le frontend existe
       .then(user => {
           if (!user) { // si le mail n'existe pas 
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
           } // si le mail existe 
           bcrypt.compare(req.body.password, user.password) // appel de la fonction "compare" de bcrypt pour comparer le mdp renseigné et le hash enregistré dans la bdd
               .then(valid => {
                   if (!valid) { // si le mot de passe est invalide
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   } // si le mdp est valide 
                   res.status(200).json({ // donnée renvoyé par le serveur sur le frontend => userId + Token 
                    userId: user._id,
                    token: jwt.sign( // token signé par id, clé secrète, durée de vie
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                   });
               })
               .catch(error => res.status(500).json({ error })); // erreur serveur 
       })
       .catch(error => res.status(500).json({ error })); 
};

