var React = require('../../shims/react');
var Card = require('./card');

var CardsList = React.createComponent({

  updateOnProps: {
    cards: 'collection'
  },

  render: function() {
    var cards = this.props.cards.map(function(card) {
      return <Card card={card} />;
    });

    return (
      <div className="cardsList js-cards-list">
        {cards}
      </div>
    );
  }

});

module.exports = CardsList;