var expect = require('chai').expect;
var Cards = require('./cards');
var Card = Cards.Card;
var Cards = Cards.Cards;

describe('Card model', () => {

  it('should set the default parameters when non provided', () => {
    var card = new Card();
    expect(card.get('title')).to.equal('Default Title');
    expect(card.get('description')).to.equal('Lorem ipsum amet');
  });

  it('should set the title when creating it with one', () => {
    var card = new Card({title: 'Title'});
    expect(card.get('title')).to.equal('Title');
  });

});
