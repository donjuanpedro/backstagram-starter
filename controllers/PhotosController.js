const PhotoModel = require('../models/PhotoModel');
const UserModel = require('../models/UserModel');

module.exports = {
  list (req, res, next) {
    PhotoModel.find()
    .populate('user')
    .exec()
    .then(photos => {
      return res.json(photos);
    })
    .catch(err => {
      return next(err);
    });
  },

  show(req, res, next) {
    PhotoModel.FindById(req.params.id)
    .populate('user')
    .exec()
    .then(photo => {
      return res.json(photo);
    })
    .catch(err => {
      return next(err);
    });
  },

  create: function(req, res, next) {
    var foundUser;
    var createdTweet;

    UserModel.findById(req.user).exec()
      .then( user => {
        foundUser = user;
        return new PhotoModel({
          image: req.body.image,
          user: user
        }).save()
      })
      .then(photo => {
        createdPhoto = photo;
        foundUser.photos.push(photo);
        return foundUser.save()
      })
      .then(() => {
        return res.json(createdPhoto);
      })
      .catch(next);
  }
};
