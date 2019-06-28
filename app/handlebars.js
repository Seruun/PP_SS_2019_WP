'use strict';

var i18next = require('./i18next');
var hbs = require('hbs');
var logger = require('./logger');
var path = require('path');
var helpers = require('./helpers');

// register Partials
hbs.registerPartials(path.join(__dirname, '../views/partials'), function() {
    logger.info('Handlebars partials loaded');
});

hbs.registerHelper('translate', function(i18n_key) {
    var result = i18next.t(i18n_key);
    return new hbs.handlebars.SafeString(result);
});

hbs.registerHelper('ifFirstCarousel', function(index, options) {
    return index === 0 ? 'active' : '';
});

hbs.registerHelper('language', function() {
    let language;
    if (process.env.DEFAULT_LANGUAGE === 'en') {
        language = 'English';
    } else {
        language = 'Deutsch';
    }

    return language;
});

hbs.registerHelper("switch", function(value, options) {
    this._switch_value_ = value;
    var html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;
});

hbs.registerHelper("case", function(value, options) {
    if (value == this._switch_value_) {
        return options.fn(this);
    }
});

helpers.checkInitialisation(hbs, 'handlebars');

module.exports = hbs;