var React = require('../../shims/react');

var Card = React.createComponent({

  updateOnProps: {
    card: 'model'
  },

  click: function() {
    console.log('asdasd');
  },

  render: function() {
    return (
      <div className="card js-card">
        <h4 className="card__title">{this.props.card.get('title')}</h4>
        <span className="card__description">{this.props.card.get('description')}</span>
        <input/>
      </div>
    );
  }
});

module.exports = Card;
