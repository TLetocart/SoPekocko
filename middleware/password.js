const passwordSchema = require('../models/schemaPassword.js');

// Vérifie que le mdp respecte le schema de schemaPassword.js
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Mot de passe incorrect : 6 caractères minimun dont 1 chiffre / 1 Majuscule / 1 minuscule minimum requis. Aucun espaces possible."}', {
            'content-type': 'application/json'
        });
        res.end('Mot de passe incorrect');
    } else {
        next();
    }
};