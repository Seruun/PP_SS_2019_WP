var logger = require('./app/logger');
var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var apiLogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var app = express();
var router = require('./routes/route');
var i18nextMiddleware = require('./app/i18nMiddleware');
var i18next = require('./app/i18next');
var hbs = require('./app/handlebars');

logger.info('******************** Configured default language : ' + process.env.DEFAULT_LANGUAGE);

app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18next));

// view engine setup
app.engine('html', hbs.__express);
app.set('view engine', 'html');

//app.use(favicon(path.join(__dirname, 'public', 'img', 'brand', 'favicon.png')));
// app.use(logger('tiny'));
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(sassMiddleware({
    src: path.join(__dirname, 'public/stylesheets'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {});
});

module.exports = app;