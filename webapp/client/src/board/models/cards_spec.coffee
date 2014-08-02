expect = require('chai').expect
Cards = require './cards'
Card = Cards.Card
Cards = Cards.Cards

describe 'Card model', ->

  it 'should set the default parameters when non provided', ->
    card = new Card()
    expect(card.get('title')).to.equal 'Default Title'
    expect(card.get('description')).to.equal 'Lorem ipsum amet'


  it 'should set the title when creating it with one', ->
    card = new Card({title: 'Title'})
    expect(card.get('title')).to.equal 'Title'
