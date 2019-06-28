'use strict';

var i18next = require('i18next');
var filesystemBackend = require('i18next-node-fs-backend');
var path = require('path');
var logger = require('./logger');
var lngDetector = require('./i18nLangDetector');
var helpers = require('./helpers');
var app = require('../server');

i18next
    .use(lngDetector)
    .use(filesystemBackend)
    .init({
        lng: process.env.DEFAULT_LANGUAGE,
        debug: false,
        backend: {
            loadPath: path.join(__dirname, '../data/locales/{{lng}}/{{ns}}.json'),
            addPath: path.join(__dirname, '../data/locales/{{lng}}/{{ns}}.missing.json')
        },
        fallbackLng: process.env.DEFAULT_LANGUAGE,
        preload: ['en', 'de'],
        saveMissing: true
    });

helpers.checkInitialisation(i18next, 'i18next');

module.exports = i18next;