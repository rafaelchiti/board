var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Card = Backbone.Model.extend({
  defaults: {
    title: 'Title 1',
    description: 'Description 1'
  }

});

var Cards = Backbone.Collection.extend({
  model: Card,
  url: '/api/cards'
});

exports.Card = Card;
exports.Cards = Cards;