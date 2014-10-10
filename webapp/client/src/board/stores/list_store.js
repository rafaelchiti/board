var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var ListConstants = require('../constants/list_constants');
var merge = require('react/lib/merge');
var _ = require('underscore');

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
