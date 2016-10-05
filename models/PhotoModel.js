const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

photoSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('Photo', photoSchema);
