var React = require('../../shims/react');


var CardForm = React.createComponent({

  handleSubmit: function() {
    var title = this.refs.title.getDOMNode().value.trim();
    var description = this.refs.description.getDOMNode().value.trim();
    
    this.props.onCardSubmit({title: title, description: description});
    
    this.refs.title.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';

    this.refs.title.getDOMNode().focus();

    return false;
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="title" className="js-title"/>
        <input ref="description" className="js-description"/>
        <input type="submit" value="add"/>
      </form>
    );
  }

});

module.exports = CardForm;