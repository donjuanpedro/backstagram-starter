const Backbone = require('backbone');

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/users',
  defaults: {
    photos: new Backbone.Collection()
  },
});

module.exports = UserModel;
