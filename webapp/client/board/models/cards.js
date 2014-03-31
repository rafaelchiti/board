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

var demoCards = [
  {
    id: 1,
    title: 'Issue 1',
    description: 'This is the issue 1'
  },
  {
    id: 2,
    title: 'Issue 2',
    description: 'This is the issue 2'
  }
];

exports.Card = Card;
exports.Cards = Cards;
exports.demoCards = new Cards(demoCards);