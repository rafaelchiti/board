var _ = require('underscore');
var React = require('react');
var CardsList = require('./cards_list');
var CardForm = require('./card_form');

var CardStore = require('../stores/card_store');


function getCardsState() {
  return {
    allCards: CardStore.getAll()
  };
}


var CardsBoard = React.createClass({

  getInitialState: function() {
    return getCardsState();
  },

  componentDidMount: function() {
    CardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getCardsState());
  },

  onRemove: function(cardCID) {
    var card = cards.get(cardCID);
    card.destroy();
  },

  render: function() {
    return (
      <div className="js-cards-board cardsBoard">
        <div className="cadsBoard__toolbar">
          <CardForm/>
        </div>

        <CardsList cards={this.state.allCards} onRemove={this.onRemove} />
      </div>
    );
  }
});

module.exports.start = () => {

  React.renderComponent(
    <CardsBoard/>,
    document.querySelector('.js-application-container')
  );
}