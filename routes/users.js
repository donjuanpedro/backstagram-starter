const express = require('express');
const router = express.Router();
const middleware = require('./middleware');
const UsersController = require('../controllers/UsersController');

router.get('/', middleware.auth, function(req, res, next) {
  userModel.findOne({ _id: req.user.id }, function(err, user) {
    return res.json(user);
  })
});

router.get('/', UsersController.list);
router.post('/', UsersController.create);

module.exports = router;
