var React = require('react');
var _ = require('underscore');
var CardList = require('./card_list');
var ListActions = require('../actions/list_actions');
var ListsToolbar = require('./lists_toolbar');

var CardListContainer = React.createClass({

  updateTitle: function(id, title) {
    ListActions.updateTitle(id, title);
  },

  remove: function(id) {
    ListActions.destroy(id);
  },

  render: function() {
    var lists = _(this.props.lists).map(list => {
      return <CardList list={list} key={list.id} onUpdateTitle={this.updateTitle} onRemove={this.remove} />;
    }, this);

    return (
      <div className="cardListContainer">
        {lists}
        <ListsToolbar/>
      </div>
    );
  }

});

module.exports = CardListContainer;