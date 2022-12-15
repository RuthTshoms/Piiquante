const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  // like: { type: Number, required: true}, // enlever required true
  // dislike: { type: Number, required: true },
  // usersLiked: { type: [String], required: true },
  // usersDisliked: { type: [String], required: true },
});

// const sauceSchema = mongoose.Schema({
//   sauce: { type: String, require: true },
//   image: { type: String, require: true }, // — l'URL de l'image de la sauce téléchargée par l'utilisateur
// });

module.exports = mongoose.model('Sauce', sauceSchema);

