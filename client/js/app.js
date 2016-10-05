const $ = require('jquery');
const Backbone = require('backbone');
const Router = require('./router');

// Set jQuery in the window
window.$ = window.jQuery = $;
// Require bootstrap after jQuery is defined on window
require('bootstrap-sass');

const router = new Router();
Backbone.history.start();
