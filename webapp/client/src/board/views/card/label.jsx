var React = require('react');

var Label = React.createClass({

  getInitialState: function() {
    return {selected: false};
  },

  render: function() {
    var clazz;
    if (this.state.selected)
      clazz = 'selected';
    else
      clazz = '';

    return (
      <div className={'cardLabel ' + clazz} onClick={this.handleClick}>
      </div>
    );
  },

  handleClick: function() {
    this.setState({selected: !this.state.selected});
    this.props.onClick();
  }

});

module.exports = Label;
