var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var CardConstants = require('../constants/card_constants');
var merge = require('react/lib/merge');
var _ = require('underscore');

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
