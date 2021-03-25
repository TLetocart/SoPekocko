const express = require('express');
const router = express.Router();

const auth = require('../middleware/token.js'); // On vérifie le token de connexion

const multer = require('../middleware/multer-config.js'); // Gestion images

const saucesController = require('../controllers/sauces.js');

// Routes vers toutes les fonctions du controller sauces.js 
router.post('/', auth, multer, saucesController.sauces);
router.put('/:id', auth, multer, saucesController.changeSauce);
router.delete('/:id', auth, saucesController.deleteSauce);
router.get('/:id', auth, saucesController.getOneSauce);
router.get('/', auth, saucesController.getAllSauce);

// Like et Dislike
router.post('/:id/like', auth, saucesController.likeDislike);


module.exports = router;