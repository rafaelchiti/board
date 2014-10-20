var AppDispatcher = require('../dispatcher/app_dispatcher');
var CardConstants = require('../constants/card_constants');

var CardActions = {

  create: function(listId, title, description) {
    AppDispatcher.handleViewAction({
      actionType: CardConstants.CARD_CREATE,
      listId: listId,
      title: title,
      description: description
    });
  },

  destroy: function(id) {
    AppDispatcher.handleViewAction({
      actionType: CardConstants.CARD_DESTROY,
      id: id
    });
  },

  moveToPosition: function(position, cardToMoveId) {
    AppDispatcher.handleViewAction({
      actionType: CardConstants.CARD_MOVE_TO_POSITION,
      position: position,
      cardToMoveId: cardToMoveId
    });
  }

};

module.exports = CardActions;