const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors');
const signup = require('./routes/signup.js');
const sauces = require ('./routes/sauce.js');

// On fait appel à la base de données
const mongoose = require('mongoose');

// Connexion à la base de données avec une variable d'environnement pour proteger les infos de connexions a la base de donnée
require('dotenv').config();

mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Gestion des images
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

//Transformer les données POST en objet JSON pour les exploiter
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth', signup);

app.use('/api/sauces', sauces);

module.exports = app;

// Sécurité

// Configure, les en-têtes HTTP pour protéger de certaines vulnérabilités
const helmet = require('helmet'); 
const session = require('cookie-session');
const nocache = require('nocache')

app.use(helmet());
app.use(nocache()); // Empêche la mise en cache

// Eviter les erreurs CORS pour ouvrir les requêtes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

