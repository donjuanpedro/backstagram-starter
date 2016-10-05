const Backbone = require('backbone');
const UserModel = require('./models/UserModel');
const UserView = require('./views/UserView');
const NavBarView = require('./views/NavBarView');
const PhotosCollection = require('./collections/PhotosCollection');

let currentView;

const Router = Backbone.Router.extend({
  routes: {
    "" : "photos",
    "user/:id" : "user",
    "*photos" : "photos",
  },

  initialize() {
    $('#nav').html(
      new NavBarView().render().el
    );
  },

  photos() {
    const PhotoListView = require('./views/PhotoListView');
    const collection = new PhotosCollection();
    const view = new PhotoListView({ collection });
    collection.fetch();

    setView(view);
  },

  user(id) {
    const model = new UserModel({ _id: id });
    const collection = new PhotosCollection();
    const view = new UserView({ model, collection });
    collection.url = `/users/${id}/photos`;
    collection.fetch();
    model.fetch();

    setView(view);
  }
});

function setView(view) {
  if(currentView) {
    currentView.remove();
  }
  currentView = view;

  const app = document.querySelector('#app');
  app.innerHTML = '';
  $(app).html(view.render().el);
};

module.exports = Router;
