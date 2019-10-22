const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const logger = require('morgan');

// The main router for the api endpoints
const apiRouter = require('./routes/api');

//Creates our express app
const app = express();

// Load Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(express.urlencoded({ extended: false }));

// Load Routes
app.use(apiRouter);

// Catch 404's and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ 'message': err.status });
});

module.exports = app;