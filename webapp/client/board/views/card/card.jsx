var React = require('react');
var Label = require('./label');
var LabelsSelector = require('./labels_selector');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Card = React.createComponent({

  updateOnProps: {
    card: 'model'
  },

  getInitialState: function() {
    return {labelsSelectorShown: false};
  },

  remove: function() {
    this.props.onRemove(this.props.card.cid);
  },

  render: function() {
    return (
      <div className="card">
        <h4 className="card__title">{this.props.card.get('title')}</h4>
        <span className="card__description">{this.props.card.get('description')}</span>

        <span className="card__remove" onClick={this.remove}><i className="fi-trash"></i></span>

        <Label onClick={this.onLabelClick}/>

        <LabelsSelector shown={this.state.labelsSelectorShown}/>
      </div>
    );
  },

  onLabelClick: function() {
    this.setState({labelsSelectorShown: !this.state.labelsSelectorShown});
  }
});

module.exports = Card;
