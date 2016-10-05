const Backbone = require('backbone');
const UserModel = require('./UserModel');

const UsersCollection = Backbone.Collection.extend({
  url: '/users',
  model: UserModel
});

module.exports = UsersCollection;
