const Sauce = require('../models/sauce.js');

const fs = require('fs');

exports.sauces = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  
  const sauce = new Sauce({
    ...sauceObject,
  
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // On crée une URL pour la nouvelle sauce
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save() // Save dans la Base de données

    // Codes HTTP de la requête new Sauce
    .then(() => res.status(201).json({
      message: 'Sauce ajouté'
    }))
    .catch(error => res.status(400).json({
      error
    }));
};

// Modification d'une sauce

exports.changeSauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? (
    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1] // Suppression image affilié à la sauce
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${ // Création d'une nouvelle image
        req.file.filename
      }`,
    }
  ) : (
    sauceObject = {
      ...req.body
    }
  )
  Sauce.updateOne(
      {
        _id: req.params.id
      }, {
        ...sauceObject,
        _id: req.params.id
      }
    )
    .then(() => res.status(200).json({
      message: 'Modification effectuée'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

// Suppression d'une sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Sauce supprimée'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};

// Récupérer une sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({
      error
    }));
};

// Récupérer l'intégralité des sauces de la base

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({
      error
    }));
};

// Système de like dislike pour les sauces

exports.likeDislike = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id // id de la sauce

  // Like
  if (like === 1) {
    Sauce.updateOne({
        _id: sauceId
      }, {
        $push: {
          usersLiked: userId
        },
        $inc: {
          likes: +1
        },
      })
      .then(() => res.status(200).json({
        message: 'Sauce likée '
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }

  // Dislike
  if (like === -1) {
    Sauce.updateOne(
        {
          _id: sauceId
        }, {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: +1
          },
        }
      )
      .then(() => {
        res.status(200).json({
          message: 'Sauce disliké'
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  }

  // Annuler son like ou dislike
  if (like === 0) {
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {

        // Annule un like
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersLiked: userId
              },
              $inc: {
                likes: -1
              },
            })
            .then(() => res.status(200).json({
              message: 'Like annulé'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        
        // Annule un dislike
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersDisliked: userId
              },
              $inc: {
                dislikes: -1
              },
            })
            .then(() => res.status(200).json({
              message: 'Dislike annulé'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}
