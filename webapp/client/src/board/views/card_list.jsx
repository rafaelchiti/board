var React = require('react');
var Card = require('./card/card');
var _ = require('underscore');
var EditInPlaceInput = require('./components/edit_in_place_input');

var CardActions = require('../actions/card_actions');
var CardStore = require('../stores/card_store');

function getCardsState(listId) {
  return {allCards: CardStore.allForList(listId)};
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

  dragStart: function(draggingCard) {
    this.setState({dragging: true, draggingCard: draggingCard});
  },

  dragEnd: function() {
    // var position = this.refs.placeHolder.props.index;

    // CardActions.moveToPosition(position, this.state.draggingCardId);

    this.setState({
      dragging: false,
      hoveredCard: null
    });
  },

  hovering: function(hoveredCard) {
    if (this.state.dragging) {
      this.setState({hoveredCard: hoveredCard});
    }
  },

  render: function() {
    var cards = this.state.allCards;
    var hoveredCardIndexOf;

    if (this.state.dragging === true) {
      hoveredCardIndexOf = cards.indexOf(this.state.hoveredCard);
      cards = cards.without({id: this.state.draggingCard.id});
    }


    var cardsNodes = _(cards).map((card, index) => {
        if (this.state.dragging === true && index === hoveredCardIndexOf) {
          return <div className="cardPlaceHolder"></div>
        } else {
          return this.buildCard(card);
        }
    }, this);


    return (
      <div className="cardList">
        <div className="_header">
          <EditInPlaceInput className="_title" onEdit={this.updateTitle} text={this.props.list.title}/>
        </div>
        <span ref="cards">{cardsNodes}</span>
        <span>{draggingCard}</span>
        <div className="_addCardButton" onClick={this.addCard}>Add card...</div>
      </div>
    );
  },

  buildCard: function(card) {
    return <Card key={card.id} card={card} onRemove={this.onRemoveCard}
            onDragStart={this.dragStart} onDragEnd={this.dragEnd} hovering={this.hovering} />;
  }

});

module.exports = CardList;
