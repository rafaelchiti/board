webpackJsonp([0],{

/***/ 0:
/*!*****************!*\
  !*** multi app ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./webapp/client/lib/lib.js */2);
	module.exports = __webpack_require__(/*! ./webapp/client/client.js */1);


/***/ },

/***/ 1:
/*!*********************************!*\
  !*** ./webapp/client/client.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cardsBoard = __webpack_require__(/*! ./src/board/views/cards_board.jsx */ 14);
	
	cardsBoard.start();

/***/ },

/***/ 2:
/*!**********************************!*\
  !*** ./webapp/client/lib/lib.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(/*! ./react_backbone */ 9);

/***/ },

/***/ 9:
/*!*********************************************!*\
  !*** ./webapp/client/lib/react_backbone.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(/*! react/addons */ 4);
	var Backbone = __webpack_require__(/*! backbone */ 6);
	var _ = __webpack_require__(/*! underscore */ 5);
	
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

/***/ },

/***/ 14:
/*!*******************************************************!*\
  !*** ./webapp/client/src/board/views/cards_board.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var _ = __webpack_require__(/*! underscore */ 5);
	var React = __webpack_require__(/*! react */ 59);
	var CardsList = __webpack_require__(/*! ./cards_list */ 60);
	var CardForm = __webpack_require__(/*! ./card_form */ 61);
	
	var Cards = __webpack_require__(/*! ../models/cards */ 62).Cards;
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
	      React.DOM.div({className: "js-cards-board cardsBoard"}, 
	        React.DOM.div({className: "cadsBoard__toolbar"}, 
	          CardForm({onCardSubmit: this.onCardSubmit})
	        ), 
	
	        CardsList({cards: this.state.data, onRemove: this.onRemove})
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

/***/ },

/***/ 59:
/*!**************************!*\
  !*** ./~/react/react.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = __webpack_require__(/*! ./lib/React */ 17);

/***/ },

/***/ 60:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/views/cards_list.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 59);
	var Card = __webpack_require__(/*! ./card/card */ 123);
	
	var CardsList = React.createComponent({
	
	  updateOnProps: {
	    cards: 'collection'
	  },
	
	  onRemove: function(cardCID) {
	    this.props.onRemove(cardCID);
	  },
	
	  render: function() {
	    var cards = this.props.cards.map(function(card) {
	      return Card({key: card.cid, card: card, onRemove: this.onRemove});
	    }, this);
	
	    return (
	      React.DOM.div({className: "cardsList js-cards-list"}, 
	        cards
	      )
	    );
	  }
	
	});
	
	module.exports = CardsList;

/***/ },

/***/ 61:
/*!*****************************************************!*\
  !*** ./webapp/client/src/board/views/card_form.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 59);
	
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
	      React.DOM.form({className: "cardForm", onSubmit: this.handleSubmit}, 
	        React.DOM.input({ref: "title", placeholder: "Card title", type: "text", className: "js-title"}), 
	        React.DOM.input({ref: "description", placeholder: "Card Desc.", type: "text", className: "js-description"}), 
	        React.DOM.input({type: "submit", value: "add"})
	      )
	    );
	  }
	
	});
	
	module.exports = CardForm;

/***/ },

/***/ 62:
/*!*************************************************!*\
  !*** ./webapp/client/src/board/models/cards.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Backbone = __webpack_require__(/*! backbone */ 6);
	Backbone.$ = __webpack_require__(/*! jquery */ 8);
	
	var Card = Backbone.Model.extend({
	  defaults: {
	    title: 'Default Title',
	    description: 'Lorem ipsum amet'
	  }
	
	});
	
	
	var Cards = Backbone.Collection.extend({
	
	  localStorage: new Backbone.LocalStorage("Cards"),
	
	  model: Card
	});
	
	exports.Card = Card;
	exports.Cards = Cards;

/***/ },

/***/ 123:
/*!*****************************************************!*\
  !*** ./webapp/client/src/board/views/card/card.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 59);
	var Label = __webpack_require__(/*! ./label */ 153);
	var LabelsSelector = __webpack_require__(/*! ./labels_selector */ 154);
	
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
	      React.DOM.div({className: "card"}, 
	        React.DOM.h4({className: "card__title"}, this.props.card.get('title')), 
	        React.DOM.span({className: "card__description"}, this.props.card.get('description')), 
	
	        React.DOM.span({className: "card__remove", onClick: this.remove}, React.DOM.i({className: "fi-trash"})), 
	
	        Label({onClick: this.onLabelClick}), 
	
	        LabelsSelector({shown: this.state.labelsSelectorShown})
	      )
	    );
	  },
	
	  onLabelClick: function() {
	    this.setState({labelsSelectorShown: !this.state.labelsSelectorShown});
	  }
	});
	
	module.exports = Card;


/***/ },

/***/ 153:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/views/card/label.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 59);
	
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
	      React.DOM.div({className: 'cardLabel ' + clazz, onClick: this.handleClick}
	      )
	    );
	  },
	
	  handleClick: function() {
	    this.setState({selected: !this.state.selected});
	    this.props.onClick();
	  }
	
	});
	
	module.exports = Label;


/***/ },

/***/ 154:
/*!****************************************************************!*\
  !*** ./webapp/client/src/board/views/card/labels_selector.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 59);
	
	var LabelsSelector = React.createComponent({
	
	  render: function() {
	    var clazz;
	    if (this.props.shown)
	      clazz = 'displayed';
	    else
	      clazz = '';
	
	    return (
	      React.DOM.div({className: 'labelsSelector ' + clazz}, 
	        React.DOM.span({className: "labelsSelector__label label1"}), 
	        React.DOM.span({className: "labelsSelector__label label2"}), 
	        React.DOM.span({className: "labelsSelector__label label3"}), 
	        React.DOM.span({className: "labelsSelector__label label4"})
	      )
	    );
	  }
	
	});
	
	module.exports = LabelsSelector;


/***/ }

});
//# sourceMappingURL=webpack_app_bundle.js.map