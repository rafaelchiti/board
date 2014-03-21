/** @jsx React.DOM */
var React = require('react');

var Cards = React.createClass({
  render: function() {
    return (
      <div className="cards js-cards">
        Cards container
      </div>
    );
  }
});

React.renderComponent(Cards(), document.querySelector('.js-cards-container'));