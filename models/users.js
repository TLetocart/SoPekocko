const mongoose = require('mongoose');
require('mongoose-type-email');

// On vérifie que l'adresse mail est unique avec un plugin
const uniqueValidator = require('mongoose-unique-validator');

// Schéma de données de l'utilisateur
const inscriptionSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Adresse mail"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Adresse mail incorrect ou deja utilisée"]
  },
  password: {
    type: String,
    required: [true, "Mot de passe"]
  }
});

// Plugin vérifiant l'unicité de l'email
inscriptionSchema.plugin(uniqueValidator);

// Exportation du schema d'inscription
module.exports = mongoose.model('User', inscriptionSchema);