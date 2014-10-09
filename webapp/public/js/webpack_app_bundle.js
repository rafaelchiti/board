webpackJsonp([0],{

/***/ 0:
/*!*****************!*\
  !*** multi app ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./webapp/client/client.js */1);


/***/ },

/***/ 1:
/*!*********************************!*\
  !*** ./webapp/client/client.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cardsBoard = __webpack_require__(/*! ./src/board/views/cards_board.jsx */ 7);
	
	cardsBoard.start();

/***/ },

/***/ 7:
/*!*******************************************************!*\
  !*** ./webapp/client/src/board/views/cards_board.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var _ = __webpack_require__(/*! underscore */ 4);
	var React = __webpack_require__(/*! react */ 51);
	var CardsList = __webpack_require__(/*! ./cards_list */ 52);
	var CardForm = __webpack_require__(/*! ./card_form */ 53);
	
	var Cards = __webpack_require__(/*! ../models/cards */ 164).Cards;
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

/***/ 51:
/*!**************************!*\
  !*** ./~/react/react.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = __webpack_require__(/*! ./lib/React */ 9);

/***/ },

/***/ 52:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/views/cards_list.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var Card = __webpack_require__(/*! ./card/card */ 115);
	
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

/***/ 53:
/*!*****************************************************!*\
  !*** ./webapp/client/src/board/views/card_form.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var CardActions = __webpack_require__(/*! ../actions/card_actions */ 116);
	
	var CardForm = React.createClass({displayName: 'CardForm',
	
	  handleSubmit: function() {
	    var card = {};
	    var title = this.refs.title.getDOMNode().value.trim();
	    var description = this.refs.description.getDOMNode().value.trim();
	
	    if (title)
	      card.title = title;
	    if (description)
	      card.description = description;
	
	    CardActions.create(title, description);
	
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

/***/ 115:
/*!*****************************************************!*\
  !*** ./webapp/client/src/board/views/card/card.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var Label = __webpack_require__(/*! ./label */ 148);
	var LabelsSelector = __webpack_require__(/*! ./labels_selector */ 149);
	
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

/***/ 116:
/*!*********************************************************!*\
  !*** ./webapp/client/src/board/actions/card_actions.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AppDispatcher = __webpack_require__(/*! ../dispatcher/app_dispatcher */ 117);
	var CardConstants = __webpack_require__(/*! ../constants/card_constants */ 118);
	
	var CardActions = {
	
	  /**
	   * @param  {string} text
	   */
	  create: function(title, description) {
	    AppDispatcher.handleViewAction({
	      actionType: CardConstants.CARD_CREATE,
	      title: title,
	      description: description
	    });
	  },
	
	  /**
	   * @param  {string} id
	   */
	  destroy: function(id) {
	    AppDispatcher.handleViewAction({
	      actionType: CardConstants.CARD_DESTROY,
	      id: id
	    });
	  }
	
	};
	
	module.exports = CardActions;

/***/ },

/***/ 117:
/*!**************************************************************!*\
  !*** ./webapp/client/src/board/dispatcher/app_dispatcher.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Dispatcher = __webpack_require__(/*! flux */ 154).Dispatcher;
	var copyProperties = __webpack_require__(/*! react/lib/copyProperties */ 50);
	var AppDispatcher = copyProperties(new Dispatcher(), {
	
	  /**
	   * A bridge function between the views and the dispatcher, marking the action
	   * as a view action.  Another variant here could be handleServerAction.
	   * @param  {object} action The data coming from the view.
	   */
	  handleViewAction: function(action) {
	    this.dispatch({
	      source: 'VIEW_ACTION',
	      action: action
	    });
	  }
	
	});
	
	module.exports = AppDispatcher;

/***/ },

/***/ 118:
/*!*************************************************************!*\
  !*** ./webapp/client/src/board/constants/card_constants.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var keyMirror = __webpack_require__(/*! react/lib/keyMirror */ 63);
	
	module.exports = keyMirror({
	  CARD_CREATE: null,
	  CARD_COMPLETE: null,
	  CARD_DESTROY: null,
	  CARD_DESTROY_COMPLETED: null,
	  CARD_TOGGLE_COMPLETE_ALL: null,
	  CARD_UNDO_COMPLETE: null,
	  CARD_UPDATE_TEXT: null
	});

/***/ },

/***/ 148:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/views/card/label.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	
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

/***/ 149:
/*!****************************************************************!*\
  !*** ./webapp/client/src/board/views/card/labels_selector.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	
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


/***/ },

/***/ 154:
/*!*************************!*\
  !*** ./~/flux/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 157)

/***/ },

/***/ 157:
/*!**********************************!*\
  !*** ./~/flux/lib/Dispatcher.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(/*! ./invariant */ 159);
	
	var _lastID = 1;
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };
	
	
	module.exports = Dispatcher;

/***/ },

/***/ 159:
/*!*********************************!*\
  !*** ./~/flux/lib/invariant.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;

/***/ },

/***/ 164:
/*!*************************************************!*\
  !*** ./webapp/client/src/board/models/cards.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Backbone = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"backbone\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	Backbone.$ = __webpack_require__(/*! jquery */ 5);
	
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

/***/ }

});
//# sourceMappingURL=webpack_app_bundle.js.map