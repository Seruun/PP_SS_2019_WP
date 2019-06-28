'use strict';

var logger = require('./logger');

var Helpers = {
    checkInitialisation: function(object, component) {
        if (object) {
            logger.info('******************** ' + component + ' initialized');
        } else {
            logger.error('******************** ' + component + ' NOT initialized');
        }
    }
};

module.exports = Helpers;