var _ = require('underscore');
var React = require('react');
var CardsList = require('./cards_list');
var CardForm = require('./card_form');

var Cards = require('../models/cards').Cards;
var cards = new Cards();


var CardsBoard = React.createComponent({

  getInitialState: function() {
    return {data: cards};
  },

  onCardSubmit: function(card) {
    var card = cards.add(card);
    card.save();
  },

  onRemove: function(cardCID) {
    var card = cards.get(cardCID);
    card.destroy();
  },

  render: function() {
    return (
      <div className="js-cards-board cardsBoard">
        <div className="cadsBoard__toolbar">
          <CardForm onCardSubmit={this.onCardSubmit} />
        </div>

        <CardsList cards={this.state.data} onRemove={this.onRemove} />
      </div>
    );
  }
});

module.exports.start = () => {
  cards.fetch();

  React.renderComponent(
    <CardsBoard/>,
    document.querySelector('.js-application-container')
  );
}