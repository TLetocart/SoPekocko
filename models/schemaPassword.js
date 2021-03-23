const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

// Pré-requis mot de passe
passwordSchema
.is().min(6)            // Longueur minimun de 6 caractère
.has().uppercase()      // Une majuscule minimum
.has().lowercase()      // Une minuscule minimum
.has().digits()         // Un chiffre minimum
.has().not().spaces()   // Ne doit pas avoir d'espaces 

module.exports = passwordSchema;