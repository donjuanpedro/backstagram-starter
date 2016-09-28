const UserModel = require('../models/UserModel.js');

module.exports = {
  list(req, res, next) {
    UserModel.find()
    .exec()
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      return next(err);
    });
  },

  create: function(req, res) {
    const user = new UserModel({
      username: req.body.username,
      password: req.body.password
    });
    user.save((err, user) => {
      res.json(user);
    });
  }

};
