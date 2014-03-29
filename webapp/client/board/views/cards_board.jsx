var _ = require('underscore');
var React = require('../../shims/react');
var CardsList = require('./cards_list');

var Cards = require('../models/cards').Cards;
var cards = new Cards();
window.cards = cards;

var CardsBoard = React.createComponent({

  getInitialState: function() {
    return {data: cards};
  },

  refresh: function() {
    cards.fetch();
  },

  render: function() {
    return (
      <div className="js-cards-board cardsBoard">
        <div className="board__toolbar">
          <button onClick={this.refresh}>Fetch</button>
        </div>

        <CardsList cards={this.state.data} />
      </div>
    );
  }
});

window.board = React.renderComponent(
  <CardsBoard/>,
  document.querySelector('.js-application-container')
);