var _ = require('underscore');
var React = require('react');
var CardListContainer = require('./card_list_container');
var ListStore = require('../stores/list_store');

window.listStore = ListStore;

function getListsState() {
  return {
    allLists: ListStore.all()
  };
}

var CardsBoard = React.createClass({

  getInitialState: function() {
    return getListsState();
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getListsState());
  },

  render: function() {
    return (
      <div className="cardsBoard">
        <CardListContainer className="cardListContainer" lists={this.state.allLists}  />
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