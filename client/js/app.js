const $ = require('jquery');
const NavBarView = require('./views/NavBarView');

// Set jQuery in the window
window.$ = window.jQuery = $;

// Require bootstrap after jQuery is defined on window
require('bootstrap');

// Set Nav, will probably want to move this to your router eventually!
const nav = document.querySelector('#nav');
nav.appendChild(new NavBarView().render().el);

// Set greeting
const app = document.querySelector('#app');
const greeting = document.createElement('h2');
greeting.innerText = 'Express Backbone Starter App!';

app.appendChild(greeting);
