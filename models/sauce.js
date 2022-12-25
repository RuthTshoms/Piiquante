const mongoose = require('mongoose');

//** Définission du schéma de données des sauces */
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },  // l'URL de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: Number, required: true },
  like: { type: Number, default: 0 }, // définir 0 par défaut
  dislike: { type: Number, default: 0 },
  usersLiked: { type: [String] }, // de type tableau contenant des chaînes de caractères (les userId de ceux ayant liké la sauce)
  usersDisliked: { type: [String] },
});


module.exports = mongoose.model('Sauce', sauceSchema);

