
const mongoose = require('mongoose');
const sauceValidation = require('../middleware/validationSauces');

const sauceSchema = mongoose.Schema({
  // ID de l'utilisateur qui créer la nouvelle sauce
  userId: {
    type: String,
    required: true
  },
  // Nom de la sauce
  name: {
    type: String,
    required: true,
  },
  // Créateur de la sauce
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Ingredients qui permet de pimenter la recette
  mainPepper: {
    type: String,
    required: true,
  },
  // Image associée à la sauce
  imageUrl: {
    type: String,
    required: true
  },
  // Echelle de puissance de la pimentation de la recette
  heat: {
    type: Number,
    required: true
  },
  likes: {
    type: Number
  },
  dislikes: {
    type: Number
  },
  usersLiked: {
    type: [String]
  },
  usersDisliked: {
    type: [String]
  },
})

module.exports = mongoose.model('Sauce', sauceSchema); // Exportation du schéma de l'inscription d'une nouvelle sauce