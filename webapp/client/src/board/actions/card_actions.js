var AppDispatcher = require('../dispatcher/app_dispatcher');
var CardConstants = require('../constants/card_constants');

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