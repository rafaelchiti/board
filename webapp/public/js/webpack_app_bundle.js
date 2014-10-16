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
	var CardListContainer = __webpack_require__(/*! ./card_list_container */ 52);
	var ListStore = __webpack_require__(/*! ../stores/list_store */ 53);
	
	window.listStore = ListStore;
	
	function getListsState() {
	  return {
	    allLists: ListStore.all()
	  };
	}
	
	var CardsBoard = React.createClass({displayName: 'CardsBoard',
	
	  getInitialState: function() {
	    return getListsState();
	  },
	
	  componentDidMount: function() {
	    ListStore.addChangeListener(this._onChange);
	  },
	
	  componentWillUnmount: function() {
	    ListStore.removeChangeListener(this._onChange);
	  },
	
	  _onChange: function() {
	    this.setState(getListsState());
	  },
	
	  render: function() {
	    return (
	      React.DOM.div({className: "cardsBoard"}, 
	        CardListContainer({className: "cardListContainer", lists: this.state.allLists})
	      )
	    );
	  }
	});
	
	module.exports.start = function()  {
	
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
/*!***************************************************************!*\
  !*** ./webapp/client/src/board/views/card_list_container.jsx ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var _ = __webpack_require__(/*! underscore */ 4);
	var CardList = __webpack_require__(/*! ./card_list */ 114);
	var ListActions = __webpack_require__(/*! ../actions/list_actions */ 116);
	var ListsToolbar = __webpack_require__(/*! ./lists_toolbar */ 115);
	
	var CardListContainer = React.createClass({displayName: 'CardListContainer',
	
	  updateTitle: function(id, title) {
	    ListActions.updateTitle(id, title);
	  },
	
	  remove: function(id) {
	    ListActions.destroy(id);
	  },
	
	  render: function() {
	    var lists = _(this.props.lists).map(function(list)  {
	      return CardList({list: list, key: list.id, onUpdateTitle: this.updateTitle, onRemove: this.remove});
	    }.bind(this), this);
	
	    return (
	      React.DOM.div({className: "cardListContainer"}, 
	        lists, 
	        ListsToolbar(null)
	      )
	    );
	  }
	
	});
	
	module.exports = CardListContainer;

/***/ },

/***/ 53:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/stores/list_store.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AppDispatcher = __webpack_require__(/*! ../dispatcher/app_dispatcher */ 117);
	var EventEmitter = __webpack_require__(/*! events */ 119).EventEmitter;
	var ListConstants = __webpack_require__(/*! ../constants/list_constants */ 118);
	var merge = __webpack_require__(/*! react/lib/merge */ 40);
	var _ = __webpack_require__(/*! underscore */ 4);
	
	var CHANGE_EVENT = 'change';
	var DEFAULT_TITLE = 'Enter title (click me)';
	
	var _lists = {};
	
	
	
	function randomId() {
	  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	};
	
	
	var id = randomId();
	_lists[id] = {
	  id: id,
	  title: DEFAULT_TITLE
	};
	
	function create(title) {
	  // Hand waving here -- not showing how this interacts with XHR or persistent
	  // server-side storage.
	  // Using the current timestamp + random number in place of a real id.
	  var id = randomId();
	  _lists[id] = {
	    id: id,
	    title: title
	  };
	}
	
	function destroy(id) {
	  delete _lists[id];
	}
	
	function updateTitle(id, title) {
	  var list = _(_lists).findWhere({id: id});
	  if (title)
	    list.title = title;
	}
	
	var ListStore = merge(EventEmitter.prototype, {
	
	  all: function() {
	    return _lists;
	  },
	
	  emitChange: function() {
	    this.emit(CHANGE_EVENT);
	  },
	
	  addChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	
	  removeChangeListener: function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});
	
	// Register to handle all updates
	AppDispatcher.register(function(payload) {
	  var action = payload.action;
	  var title;
	
	  switch(action.actionType) {
	    case ListConstants.LIST_CREATE:
	      title = action.title ? action.title.trim() : DEFAULT_TITLE;
	      create(title);
	      break;
	
	    case ListConstants.LIST_DESTROY:
	      destroy(action.id);
	      break;
	
	    case ListConstants.LIST_UPDATE_TITLE:
	      updateTitle(action.id, action.title);
	      break;
	
	    default:
	      return true;
	  }
	
	  // This often goes in each case that should trigger a UI change. This store
	  // needs to trigger a UI change after every view action, so we can make the
	  // code less repetitive by putting it here.  We need the default case,
	  // however, to make sure this only gets called after one of the cases above.
	  ListStore.emitChange();
	
	  return true; // No errors.  Needed by promise in Dispatcher.
	});
	
	module.exports = ListStore;

/***/ },

/***/ 114:
/*!*****************************************************!*\
  !*** ./webapp/client/src/board/views/card_list.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var Card = __webpack_require__(/*! ./card/card */ 150);
	var _ = __webpack_require__(/*! underscore */ 4);
	var EditInPlaceInput = __webpack_require__(/*! ./components/edit_in_place_input */ 151);
	
	var CardActions = __webpack_require__(/*! ../actions/card_actions */ 148);
	var CardStore = __webpack_require__(/*! ../stores/card_store */ 149);
	
	function getCardsState(listId) {
	  return {allCardsForList: CardStore.allForList(listId)};
	};
	
	var CardList = React.createClass({displayName: 'CardList',
	
	  getInitialState: function() {
	    return getCardsState();
	  },
	
	  componentDidMount: function() {
	    CardStore.addChangeListener(this._onChange);
	  },
	
	  componentWillUnmount: function() {
	    CardStore.removeChangeListener(this._onChange);
	  },
	
	  _onChange: function() {
	    this.setState(getCardsState(this.props.list.id));
	  },
	
	  onRemove: function(listId) {
	    this.props.onRemove(this.props.list.id);
	  },
	
	  addCard: function() {
	    CardActions.create(this.props.list.id);
	  },
	
	  onRemoveCard: function(cardId) {
	    CardActions.destroy(cardId);
	  },
	
	  updateTitle: function(title) {
	    this.props.onUpdateTitle(this.props.list.id, title);
	  },
	
	  dragStart: function() {
	    this.setState({dragging: true});
	  },
	
	  dragEnd: function() {
	    this.setState({dragging: false, hoveredCardId: null});
	  },
	
	  hovering: function(hoveredDetails) {
	    if (this.state.dragging) {
	      this.setState({hoveredCardId: hoveredDetails.id, hoveredCardZone: hoveredDetails.zone});
	    }
	  },
	
	  render: function() {
	    var cards = this.state.allCardsForList.slice();
	
	    var hoveredCard = _(cards).findWhere({id: this.state.hoveredCardId});
	    if (hoveredCard) {
	      var indexOf = _(cards).indexOf(hoveredCard);
	      if (this.state.hoveredCardZone === 'bottom') {
	        indexOf++;
	      }
	
	      cards.splice(indexOf, 0, {type: 'placeHolder'});
	    }
	
	    var cardsNodes = _(cards).map(function(card)  {
	      if (card.type && card.type === 'placeHolder') {
	
	        return React.DOM.div({key: "placeHolder", className: "cardPlaceHolder"})
	
	      } else {
	
	        return Card({key: card.id, card: card, onRemove: this.onRemoveCard, 
	            onDragStart: this.dragStart, onDragEnd: this.dragEnd, hovering: this.hovering});
	      }
	
	    }.bind(this), this);
	
	
	    return (
	      React.DOM.div({className: "cardList"}, 
	        React.DOM.div({className: "_header"}, 
	          EditInPlaceInput({className: "_title", onEdit: this.updateTitle, text: this.props.list.title})
	        ), 
	        cardsNodes, 
	        React.DOM.div({className: "_addCardButton", onClick: this.addCard}, "Add card...")
	      )
	    );
	  }
	});
	
	module.exports = CardList;


/***/ },

/***/ 115:
/*!*********************************************************!*\
  !*** ./webapp/client/src/board/views/lists_toolbar.jsx ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var ListActions = __webpack_require__(/*! ../actions/list_actions */ 116);
	
	
	var ListsToolbar = React.createClass({displayName: 'ListsToolbar',
	
	  addList: function() {
	    ListActions.create();
	  },
	
	  render: function() {
	    return (
	      React.DOM.div({className: "listsToolbar", onClick: this.addList}, 
	        React.DOM.span({className: "addList"}, "Add list...")
	      )
	    );
	  }
	
	});
	
	module.exports = ListsToolbar;

/***/ },

/***/ 116:
/*!*********************************************************!*\
  !*** ./webapp/client/src/board/actions/list_actions.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AppDispatcher = __webpack_require__(/*! ../dispatcher/app_dispatcher */ 117);
	var ListConstants = __webpack_require__(/*! ../constants/list_constants */ 118);
	
	var ListActions = {
	
	  create: function(title) {
	    AppDispatcher.handleViewAction({
	      actionType: ListConstants.LIST_CREATE,
	      title: title,
	    });
	  },
	
	  destroy: function(id) {
	    AppDispatcher.handleViewAction({
	      actionType: ListConstants.LIST_DESTROY,
	      id: id
	    });
	  },
	
	  updateTitle: function(id, newTitle) {
	    AppDispatcher.handleViewAction({
	      actionType: ListConstants.LIST_UPDATE_TITLE,
	      id: id,
	      title: newTitle
	    });
	  }
	
	};
	
	module.exports = ListActions;

/***/ },

/***/ 117:
/*!**************************************************************!*\
  !*** ./webapp/client/src/board/dispatcher/app_dispatcher.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Dispatcher = __webpack_require__(/*! flux */ 157).Dispatcher;
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
  !*** ./webapp/client/src/board/constants/list_constants.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var keyMirror = __webpack_require__(/*! react/lib/keyMirror */ 62);
	
	module.exports = keyMirror({
	  LIST_CREATE: null,
	  LIST_DESTROY: null,
	  LIST_UPDATE_TITLE: null
	});

/***/ },

/***/ 119:
/*!********************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/events/events.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },

/***/ 148:
/*!*********************************************************!*\
  !*** ./webapp/client/src/board/actions/card_actions.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AppDispatcher = __webpack_require__(/*! ../dispatcher/app_dispatcher */ 117);
	var CardConstants = __webpack_require__(/*! ../constants/card_constants */ 156);
	
	var CardActions = {
	
	  /**
	   * @param  {string} text
	   */
	  create: function(listId, title, description) {
	    AppDispatcher.handleViewAction({
	      actionType: CardConstants.CARD_CREATE,
	      listId: listId,
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

/***/ 149:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/stores/card_store.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AppDispatcher = __webpack_require__(/*! ../dispatcher/app_dispatcher */ 117);
	var EventEmitter = __webpack_require__(/*! events */ 119).EventEmitter;
	var CardConstants = __webpack_require__(/*! ../constants/card_constants */ 156);
	var merge = __webpack_require__(/*! react/lib/merge */ 40);
	var _ = __webpack_require__(/*! underscore */ 4);
	
	var CHANGE_EVENT = 'change';
	
	var _cards = {};
	var lastCardPosition;
	
	function randomId() {
	  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	};
	
	/**
	 * Create a Card item.
	 * @param  {string} text The content of the Card
	 */
	function create(listId, position, title, description) {
	
	  // Hand waving here -- not showing how this interacts with XHR or persistent
	  // server-side storage.
	  // Using the current timestamp + random number in place of a real id.
	  var id = randomId();
	  _cards[id] = {
	    id: id,
	    position: position,
	    listId: listId,
	    title: title,
	    description: description
	  };
	}
	
	/**
	 * Delete a Card item.
	 * @param  {string} id
	 */
	function destroy(id) {
	  delete _cards[id];
	}
	
	
	var CardStore = merge(EventEmitter.prototype, {
	
	  /**
	   * Get the entire collection of Cards.
	   * @return {object}
	   */
	  all: function() {
	    return _cards;
	  },
	
	  allForList: function(listId) {
	    var cards = _(_cards).where({listId: listId});
	
	    return cards;
	  },
	
	  emitChange: function() {
	    this.emit(CHANGE_EVENT);
	  },
	
	  /**
	   * @param {function} callback
	   */
	  addChangeListener: function(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	
	  /**
	   * @param {function} callback
	   */
	  removeChangeListener: function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});
	
	// Register to handle all updates
	AppDispatcher.register(function(payload) {
	  var action = payload.action;
	  var title, description;
	
	  switch(action.actionType) {
	    case CardConstants.CARD_CREATE:
	      title = action.title ? action.title.trim() : 'Enter title ' + randomId();
	      description = action.description ? action.description.trim() : 'Enter description';
	      var lastCard = _(_cards).last();
	
	      if (lastCardPosition === undefined) {
	        lastCardPosition = 0;
	      } else {
	        lastCardPosition++;
	      }
	
	      create(action.listId, lastCardPosition, title, description);
	      break;
	
	    case CardConstants.CARD_DESTROY:
	      destroy(action.id);
	      break;
	
	    default:
	      return true;
	  }
	
	  // This often goes in each case that should trigger a UI change. This store
	  // needs to trigger a UI change after every view action, so we can make the
	  // code less repetitive by putting it here.  We need the default case,
	  // however, to make sure this only gets called after one of the cases above.
	  CardStore.emitChange();
	
	  return true; // No errors.  Needed by promise in Dispatcher.
	});
	
	module.exports = CardStore;

/***/ },

/***/ 150:
/*!*****************************************************!*\
  !*** ./webapp/client/src/board/views/card/card.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	var Label = __webpack_require__(/*! ./label */ 167);
	var LabelsSelector = __webpack_require__(/*! ./labels_selector */ 168);
	
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
	
	var LEFT_BUTTON = 0;
	var DRAG_THRESHOLD = 5; // pixels
	
	var Card = React.createClass({displayName: 'Card',
	
	  getInitialState: function() {
	    return {mouseDown: false, dragging: false};
	  },
	
	  remove: function() {
	    this.props.onRemove(this.props.card.id);
	  },
	
	  render: function() {
	    return (
	      React.DOM.div({style: this.style(), className: "card", onMouseEnter: this.mouseEnter, onMouseDown: this.onMouseDown}, 
	
	        React.DOM.h4({className: "_title"}, this.props.card.id)
	      )
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


/***/ },

/***/ 151:
/*!**************************************************************************!*\
  !*** ./webapp/client/src/board/views/components/edit_in_place_input.jsx ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	
	var EditInPlaceInput = React.createClass({displayName: 'EditInPlaceInput',
	
	  getInitialState: function() {
	    return {editMode: false}
	  },
	
	  render: function() {
	    var clazz = this.state.editMode ? 'is-editing' : '';
	    clazz = clazz + ' ' + this.props.className;
	
	    return (
	      React.DOM.div({className: "editInPlaceInput " + clazz}, 
	        React.DOM.span({className: "_readOnlyText", onClick: this.enterEditMode}, this.props.text), 
	        React.DOM.input({type: "text", ref: "text", className: "_input", onKeyDown: this.handleInputKeyDown}), 
	        React.DOM.div({className: "_editControls"}, 
	          React.DOM.span({className: "_control _save", onClick: this.saveEdition}, React.DOM.i({className: "fi-check"})), 
	          React.DOM.span({className: "_control _cancel", onClick: this.cancelEdition}, React.DOM.i({className: "fi-x"}))
	        )
	      )
	    );
	  },
	
	  handleInputKeyDown: function (event) {
	      if (event.which === 13) {
	        this.saveEdition();
	      }
	
	      if (event.which === 27) {
	        this.escapeEdition();
	      }
	  },
	
	  saveEdition: function() {
	    var text = this.refs.text.getDOMNode().value;
	    this.setState({editMode: false, dirtyText: undefined});
	    this.props.onEdit(text);
	  },
	
	  escapeEdition: function() {
	    var text = this.refs.text.getDOMNode().value;
	    this.setState({editMode: false, dirtyText: text});
	  },
	
	  cancelEdition: function(event, options) {
	    this.refs.text.getDOMNode().value = "";
	    this.setState({editMode: false, dirtyText: undefined});
	  },
	
	  enterEditMode: function(event) {
	    var input = this.refs.text.getDOMNode();
	
	    input.value = this.state.dirtyText ?  this.state.dirtyText: this.props.text;
	    this.setState({editMode: true}, function()  {return input.select();});
	  }
	
	});
	
	module.exports = EditInPlaceInput;

/***/ },

/***/ 156:
/*!*************************************************************!*\
  !*** ./webapp/client/src/board/constants/card_constants.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var keyMirror = __webpack_require__(/*! react/lib/keyMirror */ 62);
	
	module.exports = keyMirror({
	  CARD_CREATE: null,
	  CARD_DESTROY: null
	});

/***/ },

/***/ 157:
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
	
	module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 160)

/***/ },

/***/ 160:
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
	
	var invariant = __webpack_require__(/*! ./invariant */ 162);
	
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

/***/ 162:
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

/***/ 167:
/*!******************************************************!*\
  !*** ./webapp/client/src/board/views/card/label.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	
	var Label = React.createClass({displayName: 'Label',
	
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

/***/ 168:
/*!****************************************************************!*\
  !*** ./webapp/client/src/board/views/card/labels_selector.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(/*! react */ 51);
	
	var LabelsSelector = React.createClass({displayName: 'LabelsSelector',
	
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