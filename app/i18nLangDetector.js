'use strict';

var i18nextMiddleware = require('./i18nMiddleware');
var logger = require('./logger');
var helpers = require('./helpers');

var options = {
    // order and from where user language should be detected
    order: ['path' /*, 'cookie'*/ ],
    lookupPath: 'lng',
    lookupFromPathIndex: 0,
    //lookupCookie: 'i18next',

    // cache user language
    // caches: ['cookie']
    detectLngFromHeaders: false,
    useCookie: false
};

var lngDetector = new i18nextMiddleware.LanguageDetector();
lngDetector.init(options);

helpers.checkInitialisation(lngDetector, 'language detector');

module.exports = lngDetector;