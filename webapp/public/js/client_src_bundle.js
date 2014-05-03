(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __moduleName = "webapp/client/client";
var cardsBoard = require('./src/board/views/cards_board');
cardsBoard.start();


},{"./src/board/views/cards_board":7}],2:[function(require,module,exports){
"use strict";
var __moduleName = "webapp/client/src/board/models/cards";
var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Card = Backbone.Model.extend({defaults: {
    title: 'Default Title',
    description: 'Lorem ipsum amet'
  }});
var Cards = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("Cards"),
  model: Card
});
exports.Card = Card;
exports.Cards = Cards;


},{"backbone":"5kFNoY","jquery":"HlZQrA"}],3:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
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
      React.DOM.div( {className:"card"}, 
        React.DOM.h4( {className:"card__title"}, this.props.card.get('title')),
        React.DOM.span( {className:"card__description"}, this.props.card.get('description')),

        React.DOM.span( {className:"card__remove", onClick:this.remove}, React.DOM.i( {className:"fi-trash"})),

        Label( {onClick:this.onLabelClick}),

        LabelsSelector( {shown:this.state.labelsSelectorShown})
      )
    );
  },

  onLabelClick: function() {
    this.setState({labelsSelectorShown: !this.state.labelsSelectorShown});
  }
});

module.exports = Card;

},{"./label":4,"./labels_selector":5,"react":"M6d2gk"}],4:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');

var Label = React.createComponent({

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
      React.DOM.div( {className:'cardLabel ' + clazz, onClick:this.handleClick}
      )
    );
  },

  handleClick: function() {
    this.setState({selected: !this.state.selected});
    this.props.onClick();
  }

});

module.exports = Label;

},{"react":"M6d2gk"}],5:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');

var LabelsSelector = React.createComponent({

  render: function() {
    var clazz;
    if (this.props.shown)
      clazz = 'displayed';
    else
      clazz = '';

    return (
      React.DOM.div( {className:'labelsSelector ' + clazz}, 
        React.DOM.span( {className:"labelsSelector__label label1"}),
        React.DOM.span( {className:"labelsSelector__label label2"}),
        React.DOM.span( {className:"labelsSelector__label label3"}),
        React.DOM.span( {className:"labelsSelector__label label4"})
      )
    );
  }

});

module.exports = LabelsSelector;

},{"react":"M6d2gk"}],6:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');

var CardForm = React.createComponent({

  handleSubmit: function() {
    var card = {};
    var title = this.refs.title.getDOMNode().value.trim();
    var description = this.refs.description.getDOMNode().value.trim();

    if (title)
      card.title = title;
    if (description)
      card.description = description;

    this.props.onCardSubmit(card);

    this.refs.title.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';

    this.refs.title.getDOMNode().focus();

    return false;
  },

  render: function() {
    return (
      React.DOM.form( {className:"cardForm", onSubmit:this.handleSubmit}, 
        React.DOM.input( {ref:"title", placeholder:"Card title", type:"text", className:"js-title"}),
        React.DOM.input( {ref:"description", placeholder:"Card Desc.", type:"text", className:"js-description"}),
        React.DOM.input( {type:"submit", value:"add"})
      )
    );
  }

});

module.exports = CardForm;
},{"react":"M6d2gk"}],7:[function(require,module,exports){
/** @jsx React.DOM */var _ = require('underscore');
var React = require('react');
var CardsList = require('./cards_list');
var CardForm = require('./card_form');

var Cards = require('../models/cards').Cards;
var cards = new Cards();


var CardsBoard = React.createComponent({

  getInitialState: function() {
    return {data: cards};
  },

  onCardSubmit: function(card) {
    var card = cards.add(card);
    card.save();
  },

  onRemove: function(cardCID) {
    var card = cards.get(cardCID);
    card.destroy();
  },

  render: function() {
    return (
      React.DOM.div( {className:"js-cards-board cardsBoard"}, 
        React.DOM.div( {className:"cadsBoard__toolbar"}, 
          CardForm( {onCardSubmit:this.onCardSubmit} )
        ),

        CardsList( {cards:this.state.data, onRemove:this.onRemove} )
      )
    );
  }
});

module.exports.start = function()  {
  cards.fetch();

  React.renderComponent(
    CardsBoard(null),
    document.querySelector('.js-application-container')
  );
}
},{"../models/cards":2,"./card_form":6,"./cards_list":8,"react":"M6d2gk","underscore":"ZKusGn"}],8:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var Card = require('./card/card');

var CardsList = React.createComponent({

  updateOnProps: {
    cards: 'collection'
  },

  onRemove: function(cardCID) {
    this.props.onRemove(cardCID);
  },

  render: function() {
    var cards = this.props.cards.map(function(card) {
      return Card( {key:card.cid, card:card, onRemove:this.onRemove} );
    }, this);

    return (
      React.DOM.div( {className:"cardsList js-cards-list"}, 
        cards
      )
    );
  }

});

module.exports = CardsList;
},{"./card/card":3,"react":"M6d2gk"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcmFmYWVsY2hpdGkvRG9jdW1lbnRzL0RldmVsb3BtZW50L0NvZGUvYm9hcmQvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9yYWZhZWxjaGl0aS9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvQ29kZS9ib2FyZC93ZWJhcHAvY2xpZW50L2NsaWVudC5qcyIsIi9Vc2Vycy9yYWZhZWxjaGl0aS9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvQ29kZS9ib2FyZC93ZWJhcHAvY2xpZW50L3NyYy9ib2FyZC9tb2RlbHMvY2FyZHMuanMiLCIvVXNlcnMvcmFmYWVsY2hpdGkvRG9jdW1lbnRzL0RldmVsb3BtZW50L0NvZGUvYm9hcmQvd2ViYXBwL2NsaWVudC9zcmMvYm9hcmQvdmlld3MvY2FyZC9jYXJkLmpzeCIsIi9Vc2Vycy9yYWZhZWxjaGl0aS9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvQ29kZS9ib2FyZC93ZWJhcHAvY2xpZW50L3NyYy9ib2FyZC92aWV3cy9jYXJkL2xhYmVsLmpzeCIsIi9Vc2Vycy9yYWZhZWxjaGl0aS9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvQ29kZS9ib2FyZC93ZWJhcHAvY2xpZW50L3NyYy9ib2FyZC92aWV3cy9jYXJkL2xhYmVsc19zZWxlY3Rvci5qc3giLCIvVXNlcnMvcmFmYWVsY2hpdGkvRG9jdW1lbnRzL0RldmVsb3BtZW50L0NvZGUvYm9hcmQvd2ViYXBwL2NsaWVudC9zcmMvYm9hcmQvdmlld3MvY2FyZF9mb3JtLmpzeCIsIi9Vc2Vycy9yYWZhZWxjaGl0aS9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvQ29kZS9ib2FyZC93ZWJhcHAvY2xpZW50L3NyYy9ib2FyZC92aWV3cy9jYXJkc19ib2FyZC5qc3giLCIvVXNlcnMvcmFmYWVsY2hpdGkvRG9jdW1lbnRzL0RldmVsb3BtZW50L0NvZGUvYm9hcmQvd2ViYXBwL2NsaWVudC9zcmMvYm9hcmQvdmlld3MvY2FyZHNfbGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFBSSxDQUFKLEVBQUksQ0FBQSxVQUFVLEVBQUcsQ0FBQSxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUUxRCxDQUFBLFNBQVUsTUFBTSxFQUFFLENBQUM7Q0FDbkI7OztBQ0hBOztBQUFJLENBQUosRUFBSSxDQUFBLFFBQVEsRUFBRyxDQUFBLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxDQUFBLE9BQVEsRUFBRSxFQUFHLENBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTNCLENBQUosRUFBSSxDQUFBLElBQUksRUFBRyxDQUFBLFFBQVEsTUFBTSxPQUFPLENBQUMsQ0FDL0IsUUFBUSxDQUFFO0FBQ1IsQ0FBQSxRQUFLLENBQUUsZ0JBQWU7QUFDdEIsQ0FBQSxjQUFXLENBQUUsbUJBQWtCO0NBQUEsRUFDaEMsQ0FFRixDQUFDLENBQUM7QUFFQyxDQUFKLEVBQUksQ0FBQSxLQUFLLEVBQUcsQ0FBQSxRQUFRLFdBQVcsT0FBTyxDQUFDO0FBRXJDLENBQUEsYUFBWSxDQUFFLElBQUksQ0FBQSxRQUFRLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFFaEQsQ0FBQSxNQUFLLENBQUUsS0FBSTtDQUFBLEFBQ1osQ0FBQyxDQUFDO0FBR0gsQ0FBQSxNQUFPLEtBQUssRUFBRyxLQUFJLENBQUM7QUFDcEIsQ0FBQSxNQUFPLE1BQU0sRUFBRyxNQUFLLENBQUM7Q0FBQTs7O0FDcEJ0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjYXJkc0JvYXJkID0gcmVxdWlyZSgnLi9zcmMvYm9hcmQvdmlld3MvY2FyZHNfYm9hcmQnKTtcblxuY2FyZHNCb2FyZC5zdGFydCgpO1xuIiwidmFyIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKTtcbkJhY2tib25lLiQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxudmFyIENhcmQgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuICBkZWZhdWx0czoge1xuICAgIHRpdGxlOiAnRGVmYXVsdCBUaXRsZScsXG4gICAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBhbWV0J1xuICB9XG5cbn0pO1xuXG52YXIgQ2FyZHMgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG5cbiAgbG9jYWxTdG9yYWdlOiBuZXcgQmFja2JvbmUuTG9jYWxTdG9yYWdlKFwiQ2FyZHNcIiksXG5cbiAgbW9kZWw6IENhcmRcbn0pO1xuXG5cbmV4cG9ydHMuQ2FyZCA9IENhcmQ7XG5leHBvcnRzLkNhcmRzID0gQ2FyZHM7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBMYWJlbCA9IHJlcXVpcmUoJy4vbGFiZWwnKTtcbnZhciBMYWJlbHNTZWxlY3RvciA9IHJlcXVpcmUoJy4vbGFiZWxzX3NlbGVjdG9yJyk7XG5cbnZhciBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCA9IFJlYWN0LmFkZG9ucy5DU1NUcmFuc2l0aW9uR3JvdXA7XG5cbnZhciBDYXJkID0gUmVhY3QuY3JlYXRlQ29tcG9uZW50KHtcblxuICB1cGRhdGVPblByb3BzOiB7XG4gICAgY2FyZDogJ21vZGVsJ1xuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtsYWJlbHNTZWxlY3RvclNob3duOiBmYWxzZX07XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKHRoaXMucHJvcHMuY2FyZC5jaWQpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjYXJkXCJ9LCBcbiAgICAgICAgUmVhY3QuRE9NLmg0KCB7Y2xhc3NOYW1lOlwiY2FyZF9fdGl0bGVcIn0sIHRoaXMucHJvcHMuY2FyZC5nZXQoJ3RpdGxlJykpLFxuICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcImNhcmRfX2Rlc2NyaXB0aW9uXCJ9LCB0aGlzLnByb3BzLmNhcmQuZ2V0KCdkZXNjcmlwdGlvbicpKSxcblxuICAgICAgICBSZWFjdC5ET00uc3Bhbigge2NsYXNzTmFtZTpcImNhcmRfX3JlbW92ZVwiLCBvbkNsaWNrOnRoaXMucmVtb3ZlfSwgUmVhY3QuRE9NLmkoIHtjbGFzc05hbWU6XCJmaS10cmFzaFwifSkpLFxuXG4gICAgICAgIExhYmVsKCB7b25DbGljazp0aGlzLm9uTGFiZWxDbGlja30pLFxuXG4gICAgICAgIExhYmVsc1NlbGVjdG9yKCB7c2hvd246dGhpcy5zdGF0ZS5sYWJlbHNTZWxlY3RvclNob3dufSlcbiAgICAgIClcbiAgICApO1xuICB9LFxuXG4gIG9uTGFiZWxDbGljazogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bGFiZWxzU2VsZWN0b3JTaG93bjogIXRoaXMuc3RhdGUubGFiZWxzU2VsZWN0b3JTaG93bn0pO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXJkO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIExhYmVsID0gUmVhY3QuY3JlYXRlQ29tcG9uZW50KHtcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7c2VsZWN0ZWQ6IGZhbHNlfTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGF6ejtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZClcbiAgICAgIGNsYXp6ID0gJ3NlbGVjdGVkJztcbiAgICBlbHNlXG4gICAgICBjbGF6eiA9ICcnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6J2NhcmRMYWJlbCAnICsgY2xhenosIG9uQ2xpY2s6dGhpcy5oYW5kbGVDbGlja31cbiAgICAgIClcbiAgICApO1xuICB9LFxuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogIXRoaXMuc3RhdGUuc2VsZWN0ZWR9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBMYWJlbHNTZWxlY3RvciA9IFJlYWN0LmNyZWF0ZUNvbXBvbmVudCh7XG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xheno7XG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd24pXG4gICAgICBjbGF6eiA9ICdkaXNwbGF5ZWQnO1xuICAgIGVsc2VcbiAgICAgIGNsYXp6ID0gJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTonbGFiZWxzU2VsZWN0b3IgJyArIGNsYXp6fSwgXG4gICAgICAgIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwibGFiZWxzU2VsZWN0b3JfX2xhYmVsIGxhYmVsMVwifSksXG4gICAgICAgIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwibGFiZWxzU2VsZWN0b3JfX2xhYmVsIGxhYmVsMlwifSksXG4gICAgICAgIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwibGFiZWxzU2VsZWN0b3JfX2xhYmVsIGxhYmVsM1wifSksXG4gICAgICAgIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwibGFiZWxzU2VsZWN0b3JfX2xhYmVsIGxhYmVsNFwifSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsc1NlbGVjdG9yO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIENhcmRGb3JtID0gUmVhY3QuY3JlYXRlQ29tcG9uZW50KHtcblxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXJkID0ge307XG4gICAgdmFyIHRpdGxlID0gdGhpcy5yZWZzLnRpdGxlLmdldERPTU5vZGUoKS52YWx1ZS50cmltKCk7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gdGhpcy5yZWZzLmRlc2NyaXB0aW9uLmdldERPTU5vZGUoKS52YWx1ZS50cmltKCk7XG5cbiAgICBpZiAodGl0bGUpXG4gICAgICBjYXJkLnRpdGxlID0gdGl0bGU7XG4gICAgaWYgKGRlc2NyaXB0aW9uKVxuICAgICAgY2FyZC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNhcmRTdWJtaXQoY2FyZCk7XG5cbiAgICB0aGlzLnJlZnMudGl0bGUuZ2V0RE9NTm9kZSgpLnZhbHVlID0gJyc7XG4gICAgdGhpcy5yZWZzLmRlc2NyaXB0aW9uLmdldERPTU5vZGUoKS52YWx1ZSA9ICcnO1xuXG4gICAgdGhpcy5yZWZzLnRpdGxlLmdldERPTU5vZGUoKS5mb2N1cygpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5mb3JtKCB7Y2xhc3NOYW1lOlwiY2FyZEZvcm1cIiwgb25TdWJtaXQ6dGhpcy5oYW5kbGVTdWJtaXR9LCBcbiAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7cmVmOlwidGl0bGVcIiwgcGxhY2Vob2xkZXI6XCJDYXJkIHRpdGxlXCIsIHR5cGU6XCJ0ZXh0XCIsIGNsYXNzTmFtZTpcImpzLXRpdGxlXCJ9KSxcbiAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7cmVmOlwiZGVzY3JpcHRpb25cIiwgcGxhY2Vob2xkZXI6XCJDYXJkIERlc2MuXCIsIHR5cGU6XCJ0ZXh0XCIsIGNsYXNzTmFtZTpcImpzLWRlc2NyaXB0aW9uXCJ9KSxcbiAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInN1Ym1pdFwiLCB2YWx1ZTpcImFkZFwifSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhcmRGb3JtOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBDYXJkc0xpc3QgPSByZXF1aXJlKCcuL2NhcmRzX2xpc3QnKTtcbnZhciBDYXJkRm9ybSA9IHJlcXVpcmUoJy4vY2FyZF9mb3JtJyk7XG5cbnZhciBDYXJkcyA9IHJlcXVpcmUoJy4uL21vZGVscy9jYXJkcycpLkNhcmRzO1xudmFyIGNhcmRzID0gbmV3IENhcmRzKCk7XG5cblxudmFyIENhcmRzQm9hcmQgPSBSZWFjdC5jcmVhdGVDb21wb25lbnQoe1xuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtkYXRhOiBjYXJkc307XG4gIH0sXG5cbiAgb25DYXJkU3VibWl0OiBmdW5jdGlvbihjYXJkKSB7XG4gICAgdmFyIGNhcmQgPSBjYXJkcy5hZGQoY2FyZCk7XG4gICAgY2FyZC5zYXZlKCk7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uKGNhcmRDSUQpIHtcbiAgICB2YXIgY2FyZCA9IGNhcmRzLmdldChjYXJkQ0lEKTtcbiAgICBjYXJkLmRlc3Ryb3koKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwianMtY2FyZHMtYm9hcmQgY2FyZHNCb2FyZFwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJjYWRzQm9hcmRfX3Rvb2xiYXJcIn0sIFxuICAgICAgICAgIENhcmRGb3JtKCB7b25DYXJkU3VibWl0OnRoaXMub25DYXJkU3VibWl0fSApXG4gICAgICAgICksXG5cbiAgICAgICAgQ2FyZHNMaXN0KCB7Y2FyZHM6dGhpcy5zdGF0ZS5kYXRhLCBvblJlbW92ZTp0aGlzLm9uUmVtb3ZlfSApXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzLnN0YXJ0ID0gZnVuY3Rpb24oKSAge1xuICBjYXJkcy5mZXRjaCgpO1xuXG4gIFJlYWN0LnJlbmRlckNvbXBvbmVudChcbiAgICBDYXJkc0JvYXJkKG51bGwpLFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hcHBsaWNhdGlvbi1jb250YWluZXInKVxuICApO1xufSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgQ2FyZCA9IHJlcXVpcmUoJy4vY2FyZC9jYXJkJyk7XG5cbnZhciBDYXJkc0xpc3QgPSBSZWFjdC5jcmVhdGVDb21wb25lbnQoe1xuXG4gIHVwZGF0ZU9uUHJvcHM6IHtcbiAgICBjYXJkczogJ2NvbGxlY3Rpb24nXG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uKGNhcmRDSUQpIHtcbiAgICB0aGlzLnByb3BzLm9uUmVtb3ZlKGNhcmRDSUQpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhcmRzID0gdGhpcy5wcm9wcy5jYXJkcy5tYXAoZnVuY3Rpb24oY2FyZCkge1xuICAgICAgcmV0dXJuIENhcmQoIHtrZXk6Y2FyZC5jaWQsIGNhcmQ6Y2FyZCwgb25SZW1vdmU6dGhpcy5vblJlbW92ZX0gKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwiY2FyZHNMaXN0IGpzLWNhcmRzLWxpc3RcIn0sIFxuICAgICAgICBjYXJkc1xuICAgICAgKVxuICAgICk7XG4gIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyZHNMaXN0OyJdfQ==
