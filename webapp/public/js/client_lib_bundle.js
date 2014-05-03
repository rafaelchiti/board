(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __moduleName = "webapp/client/lib/lib";
require('./react_backbone');


},{"./react_backbone":2}],2:[function(require,module,exports){
"use strict";
var __moduleName = "webapp/client/lib/react_backbone";
var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
React.BackboneAware = {
  listenToProps: function(props) {
    _.each(this.updateOnProps, function(events, propName) {
      switch (events) {
        case 'collection':
          events = 'add remove reset sort';
          break;
        case 'model':
          events = 'change';
      }
      this.listenTo(props[propName], events, function() {
        this.forceUpdate();
      });
    }, this);
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
};
_.extend(React.BackboneAware, Backbone.Events);
if (React.createComponent) {
  console.error('YOU ARE OVERRIDING A NATIVE REACT METHOD, FINDE A BETTER' + 'WAY TO DO THIS DUDE!!!');
}
React.createComponent = function(spec) {
  spec.mixins || (spec.mixins = []);
  spec.mixins = _.union(spec.mixins, React.BackboneAware);
  return React.createClass(spec);
};


},{"backbone":"5kFNoY","react":"M6d2gk","underscore":"ZKusGn"}]},{},[1])