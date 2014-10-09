var React = require('react');
var CardActions = require('../actions/card_actions');

var CardForm = React.createClass({

  handleSubmit: function() {
    var card = {};
    var title = this.refs.title.getDOMNode().value.trim();
    var description = this.refs.description.getDOMNode().value.trim();

    if (title)
      card.title = title;
    if (description)
      card.description = description;

    CardActions.create(title, description);

    this.refs.title.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';

    this.refs.title.getDOMNode().focus();

    return false;
  },

  render: function() {
    return (
      <form className="cardForm" onSubmit={this.handleSubmit}>
        <input ref="title" placeholder="Card title" type="text" className="js-title"/>
        <input ref="description" placeholder="Card Desc." type="text" className="js-description"/>
        <input type="submit" value="add"/>
      </form>
    );
  }

});

module.exports = CardForm;