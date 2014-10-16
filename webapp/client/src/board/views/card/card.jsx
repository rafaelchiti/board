var React = require('react');
var Label = require('./label');
var LabelsSelector = require('./labels_selector');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var LEFT_BUTTON = 0;
var DRAG_THRESHOLD = 5; // pixels

var Card = React.createClass({

  getInitialState: function() {
    return {mouseDown: false, dragging: false};
  },

  remove: function() {
    this.props.onRemove(this.props.card.id);
  },

  render: function() {
    return (
      <div style={this.style()} className="card" onMouseEnter={this.mouseEnter} onMouseDown={this.onMouseDown}>

        <h4 className="_title">{this.props.card.id}</h4>
      </div>
    );
  },

  componentDidMount: function () {
      var cardWidth = this.getDOMNode().offsetWidth;
      this.setState({width: cardWidth});
  },

  mouseEnter: function(event) {
    var elementRect = this.getDOMNode().getBoundingClientRect();

    var mousePosition = event.clientY;

    var topFromElement = mousePosition - elementRect.top;

    var zone;
    if (topFromElement > (elementRect.height / 2)) {
      zone = 'top';
    } else {
      zone = 'bottom';
    }

    this.props.hovering({id: this.props.card.id, zone: zone});
  },

  style: function() {
    if (this.state.dragging) {
      return {
        position: 'fixed',
        left: this.state.left,
        top: this.state.top,
        width: this.state.width,
        zIndex: 1,
        transform: 'rotate(3deg)',
        pointerEvents: 'none',
        cursor: 'grabbing'
      };
    } else {
      return {};
    }
  },

  onMouseDown: function(event) {
    if (event.button !== LEFT_BUTTON) {
      return;
    }

    event.stopPropagation();
    this.addEvents();
    var pageOffset = this.getDOMNode().getBoundingClientRect();

    this.setState({
      mouseDown: true,
      originX: event.pageX,
      originY: event.pageY,
      elementX: pageOffset.left,
      elementY: pageOffset.top
    });
  },

  onMouseMove: function(event) {
    var deltaX = event.pageX - this.state.originX;
    var deltaY = event.pageY - this.state.originY;
    var distance = Math.abs(deltaX) + Math.abs(deltaY);

    if (!this.state.dragging && distance > DRAG_THRESHOLD) {
      this.setState({dragging: true});
      this.props.onDragStart();
    }

    if (this.state.dragging) {
      this.setState({
        left: this.state.elementX + deltaX + document.body.scrollLeft,
        top: this.state.elementY + deltaY + document.body.scrollTop
      });
    }

  },

  onMouseUp: function() {
    this.removeEvents();
    if (this.state.dragging) {
      this.props.onDragEnd()
      this.setState({dragging: false});
    }
  },

  addEvents: function() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },

  removeEvents: function() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

});

module.exports = Card;
