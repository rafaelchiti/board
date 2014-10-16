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

  dragStart: function() {
    this.setState({dragging: true});
  },

  dragEnd: function() {
    this.setState({dragging: false, hoveredCardId: null});
  },

  hovering: function(hoveredDetails) {
    if (this.state.dragging) {
      this.setState({hoveredCardId: hoveredDetails.id, hoveredCardZone: hoveredDetails.zone});
    }
  },

  render: function() {
    var cards = this.state.allCardsForList.slice();

    var hoveredCard = _(cards).findWhere({id: this.state.hoveredCardId});
    if (hoveredCard) {
      var indexOf = _(cards).indexOf(hoveredCard);
      if (this.state.hoveredCardZone === 'bottom') {
        indexOf++;
      }

      cards.splice(indexOf, 0, {type: 'placeHolder'});
    }

    var cardsNodes = _(cards).map(card => {
      if (card.type && card.type === 'placeHolder') {

        return <div key="placeHolder" className="cardPlaceHolder"></div>

      } else {

        return <Card key={card.id} card={card} onRemove={this.onRemoveCard}
            onDragStart={this.dragStart} onDragEnd={this.dragEnd} hovering={this.hovering} />;
      }

    }, this);


    return (
      <div className="cardList">
        <div className="_header">
          <EditInPlaceInput className="_title" onEdit={this.updateTitle} text={this.props.list.title}/>
        </div>
        {cardsNodes}
        <div className="_addCardButton" onClick={this.addCard}>Add card...</div>
      </div>
    );
  }
});

module.exports = CardList;
