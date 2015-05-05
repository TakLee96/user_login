/**
 * This module adds the necessary middlewares in order to the express app
 * @author TakLee96
 */

var logger = require('./util/logger');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

module.exports = function (app) {
	app.use(logger());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use({
		secret: 'user_login',
		store: new MongoStore({mongooseConnection: mongoose.connection}),
		ttl: 7 * 24 * 60 * 60,  // 7 days (default is 14 days)
		autoRemove: 'native'    // default
	});
	app.use(express.static('public')); // might not be appropriate
};