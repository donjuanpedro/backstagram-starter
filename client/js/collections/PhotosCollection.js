const Backbone = require('backbone');
const PhotoModel = require('../models/PhotoModel');

const PhotosCollection = Backbone.Collection.extend({
  url: '/photos',
  model: PhotoModel
});

module.exports = PhotosCollection;
