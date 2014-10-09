var React = require('react');
var Card = require('./card/card');
var CardActions = require('../actions/card_actions');
var _ = require('underscore');

var CardsList = React.createClass({

  onRemove: function(cardCID) {
    CardActions.destroy(cardCID);
  },

  render: function() {
    var cards = _(this.props.cards).map(function(card) {
      return <Card key={card.id} card={card} onRemove={this.onRemove} />;
    }, this);

    return (
      <div className="cardsList js-cards-list">
        {cards}
      </div>
    );
  }

});

module.exports = CardsList;