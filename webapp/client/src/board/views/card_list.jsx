var React = require('react');
var Card = require('./card/card');
var _ = require('underscore');
var EditInPlaceInput = require('./components/edit_in_place_input');

var CardActions = require('../actions/card_actions');
var CardStore = require('../stores/card_store');

function getCardsState(listId) {
  return {allCardsForList: CardStore.allForList(listId)};
};

var CardList = React.createClass({

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
    this.setState(getCardsState(this.props.list.id));
  },

  onRemove: function(listId) {
    this.props.onRemove(this.props.list.id);
  },

  addCard: function() {
    CardActions.create(this.props.list.id);
  },

  onRemoveCard: function(cardId) {
    CardActions.destroy(cardId);
  },

  updateTitle: function(title) {
    this.props.onUpdateTitle(this.props.list.id, title);
  },

  render: function() {
    var cards = _(this.state.allCardsForList).map(card => {
      return <Card key={card.id} card={card} onRemove={this.onRemoveCard} />;
    }, this);

    return (
      <div className="cardList">
        <div className="_header">
          <EditInPlaceInput className="_title" onEdit={this.updateTitle} text={this.props.list.title}/>
        </div>
        {cards}
        <div className="_addCardButton" onClick={this.addCard}>Add card...</div>
      </div>
    );
  }
});

module.exports = CardList;
