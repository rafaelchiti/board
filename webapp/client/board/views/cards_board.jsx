var _ = require('underscore');
var React = require('../../shims/react');
var CardsList = require('./cards_list');
var CardForm = require('./card_form');

var cards = require('../models/cards').demoCards;;

var CardsBoard = React.createComponent({

  getInitialState: function() {
    return {data: cards};
  },

  onCardSubmit: function(card) {
    cards.add(card);
  },

  onRemove: function(cardCID) {
    cards.remove(cards.get(cardCID));
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

React.renderComponent(
  <CardsBoard/>,
  document.querySelector('.js-application-container')
);