var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Card = Backbone.Model.extend({
  defaults: {
    title: 'Default Title',
    description: 'Lorem ipsum amet'
  }

});

var Cards = Backbone.Collection.extend({

  localStorage: new Backbone.LocalStorage("Cards"),

  model: Card
});


exports.Card = Card;
exports.Cards = Cards;