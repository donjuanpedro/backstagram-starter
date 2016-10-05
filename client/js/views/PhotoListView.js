const Backbone = require('backbone');
const PhotoItemView = require('./PhotoItemView');
const PhotoModel = require('../models/PhotoModel');

const PhotoListView = Backbone.View.extend({
  el: `
    <div>
      <form action="/photos" method="POST">
        <div>
          <label for="name">Post Photo</label>
          <input type="file" name="image" id="image" />
          <input type="submit" value="Upload Image" name="submit" />
        </div>
      </form>
      <ul id="photolist"></ul>
    </div>
  `,

  intialize() {
    this.listenTo(this.collection, 'update', this.render);
  },

  events: {
    'submit form': 'handleFormSubmit'
  },

  handleFormSubmit(e) {
    const form = $(e.target);
    const photo = new PhotoModel({
      image: form.find('input[name="image"]').val(),
      user: $('[data-bootstrap]').data('bootstrap').userId
    });

    photo.save(null, {
      success: () => {
        this.collection.add(photo);
        form.find('input[type="text"]').val('');
        this.render();
      }
    });
    e.preventDefault();
  },

  render() {
    this.$('#photolist').html('');
    this.collection.each((photo) => {
      const photoView = new PhotoItemView ({ model: photo });
      this.$('#photolist').append(photoView.render().el);
    });
    return this;
  }
});

module.exports = PhotoListView;
