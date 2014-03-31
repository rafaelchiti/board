var React = require('../../shims/react');
var Card = require('./card');

var CardsList = React.createComponent({

  updateOnProps: {
    cards: 'collection'
  },

  onRemove: function(cardCID) {
    this.props.onRemove(cardCID);
  },

  render: function() {
    var cards = this.props.cards.map(function(card) {
      return <Card key={card.cid} card={card} onRemove={this.onRemove} />;
    }, this);

    return (
      <div className="cardsList js-cards-list">
        {cards}
      </div>
    );
  }

});

module.exports = CardsList;