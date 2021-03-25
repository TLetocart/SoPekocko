// Middleware de validation du contenu des nouvelles entrées de sauces par les utilisateurs

const validate = require('mongoose-validator');

// Nom de la sauce
exports.nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 30], // Nom compris entre 3 et 30 caractères
    message: 'Le nom de votre Sauce doit posséder entre 3 et 30 caractères', // Msg d'erreur si conditions non respectées
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // Regex pour éviter les caractères spéciaux
    message: "Le nom de votre sauce ne doit contenir que des chiffres et des lettres",
  }),
];

// Créateur de la sauce
exports.manufacturerValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 30], 
    message: 'Nom du créateur doit posséder entre 3 et 30 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i,
    message: "Le nom ne doit contenir que des chiffres et des lettres",
  }),
];

// Description de la sauce
exports.descriptionValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [10, 180],
    message: 'La description de la sauce doit posséder entre 10 et 180 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i,
    message: "Le nom de la sauce ne doit contenir que des chiffres et des lettres",
  }),
];

// Ingrédient de la sauce
exports.pepperValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Les ingrédients doivent posséder entre 3 et 20 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i,
    message: "Le nom ne doit contenir que des chiffres et des lettres",
  }),
];