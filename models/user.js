const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // package de validation qui améliore les messages d'erreur (illisibles de mongodb) lors de l'enregistrement de données uniques 

//** Définission du schéma de données des utilisateurs */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // mot clé "unique" permet que deux users n'utilisent pas le même mail 
  password: { type: String, required: true },
});


userSchema.plugin(uniqueValidator); // methode "plugin" avec arg (uniqueV)

module.exports = mongoose.model('User', userSchema);