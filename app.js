const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors');
const signup = require('./routes/signup.js');
const sauces = require ('./routes/sauce.js');

// On fait appel à la base de données
const mongoose = require('mongoose');

// Connexion à la base de données
mongoose.connect('mongodb+srv://TLetocart:toto02toto@cluster0.1qgxq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
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
