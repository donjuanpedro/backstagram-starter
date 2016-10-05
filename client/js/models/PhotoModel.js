const Backbone = require('backbone');
const UserModel = require('./UserModel');

const PhotoModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/photos',
  parse(model) {
    if (model.user) {
      model.user = new UserModel(model.user);
    }
    return model;
  }
});

module.exports = PhotoModel;
