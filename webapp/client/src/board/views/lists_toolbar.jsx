var React = require('react');
var ListActions = require('../actions/list_actions');


var ListsToolbar = React.createClass({

  addList: function() {
    ListActions.create();
  },

  render: function() {
    return (
      <div className="listsToolbar" onClick={this.addList}>
        <span className="addList">Add list...</span>
      </div>
    );
  }

});

module.exports = ListsToolbar;