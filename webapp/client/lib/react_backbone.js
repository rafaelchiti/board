var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');

React.BackboneAware = {
  listenToProps: function(props) {
    _.each(this.updateOnProps, function(events, propName) {
      switch(events) {
      case 'collection':
        events = 'add remove reset sort';
        break;
      case 'model':
        events = 'change';
      }
      this.listenTo(props[propName], events, function() { this.forceUpdate(); })
    }, this)
  },

  componentDidMount: function() {
    this.listenToProps(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.stopListening();
    this.listenToProps(nextProps);
  },

  componentWillUnmount: function() {
    this.stopListening();
  }
}

_.extend(React.BackboneAware, Backbone.Events);

if (React.createComponent) {
  console.error('YOU ARE OVERRIDING A NATIVE REACT METHOD, FINDE A BETTER' +
    'WAY TO DO THIS DUDE!!!');
}

React.createComponent = function(spec) {
  spec.mixins || (spec.mixins = []);
  spec.mixins = _.union(spec.mixins, React.BackboneAware);
  return React.createClass(spec);
};
