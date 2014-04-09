var _ = require('underscore');
var React = require('react/addons');
var Backbone = require('backbone');

require('backbone.localstorage');

// Applying plugins
require('./lib/react_backbone')(React, Backbone, _);

require('./board/views/cards_board');