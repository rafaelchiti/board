var AppDispatcher = require('../dispatcher/app_dispatcher');
var ListConstants = require('../constants/list_constants');

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