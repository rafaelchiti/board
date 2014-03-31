var React = require('../../shims/react');

var Card = React.createComponent({

  updateOnProps: {
    card: 'model'
  },

  remove: function() {
    this.props.onRemove(this.props.card.cid);
  },

  render: function() {
    return (
      <div className="card js-card">
        <h4 className="card__title">{this.props.card.get('title')}</h4>
        <span className="card__description">{this.props.card.get('description')}</span>

        <span className="card__remove" onClick={this.remove}><i className="fi-trash"></i></span>
      </div>
    );
  }
});

module.exports = Card;
