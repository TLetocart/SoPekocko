// Permet de vérifier si l'utilisateur est bien connecté avec d'accepter les requêtes

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // On récupère le token présent dans le header

    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId; // On compare le token décodé pour savoir si il provient du même user

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur non valide';
    } else {
      next(); 
    }
  } catch (error) {
    res.status(401).json({
      error: error | 'Requête non autorisée !'
    })
  }
}