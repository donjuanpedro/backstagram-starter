const _ = require('lodash');
const Backbone = require('backbone');
const PhotoListView = require('./PhotoListView');

const UserView = Backbone.View.extend({
  el: `<div></div>`,

  template: _.template(`
    <h1><%= user.get('username') %></h1>
  `),

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },

  render() {
    this.$el.html('');
    this.$el.html(this.template({ user: this.model }));
    this.$el.append(new TweetListView({ collection: this.collection }).render().el)
    return this;
    }
});

module.exports = UserView;
