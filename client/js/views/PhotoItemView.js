const _ = require('lodash');
const Backbone = require('backbone');

const PhotoItemView = Backbone.View.extend({
  el: `<li></li>`,

  template: _.template(`
    <a href = "#user/<%= photo.get('user').get('_id') %>">
      <%= photo.get('user').escape('username') %>
    </a>
    <div><%= photo.escape('image') %> </div>
    `),

    initialize() {
      this.listenTo(this.model, 'sync', this.render);
    },

    render() {
      this.$el.html(this.template({ photo: this.model }));
      return this;
    }
});

module.exports = PhotoItemView;
