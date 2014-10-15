var React = require('react');
var Label = require('./label');
var LabelsSelector = require('./labels_selector');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Card = React.createClass({

  remove: function() {
    this.props.onRemove(this.props.card.id);
  },

  render: function() {
    return (
      <div className="card">
        <h4 className="_title">{this.props.card.title}</h4>
      </div>
    );
  }

});

module.exports = Card;
