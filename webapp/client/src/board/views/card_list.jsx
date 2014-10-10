var React = require('react');
var Card = require('./card/card');
var _ = require('underscore');

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

  onAddCard: function() {
    CardActions.create(this.props.list.id);
  },

  onRemoveCard: function(cardId) {
    CardActions.destroy(cardId);
  },

  updateTitle: function() {
    var title = prompt();
    this.props.onUpdateTitle(this.props.list.id, title);
  },

  render: function() {
    var cards = _(this.state.allCardsForList).map(card => {
      return <Card key={card.id} card={card} onRemove={this.onRemoveCard} />;
    }, this);

    return (
      <div className="cardList">
        <div className="cardListHeader">
          <span className="cardListTitle"  onClick={this.updateTitle}>{this.props.list.title}</span>
          <span className="cardListRemove" onClick={this.onRemove}><i className="fi-trash"></i></span>
          <span className="cardListAddCard" onClick={this.onAddCard}><i className="fi-plus"></i></span>
        </div>
        {cards}
      </div>
    );
  }

});

module.exports = CardList;