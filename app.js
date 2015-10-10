var koa = require('koa');
var path = require('path');
var logger = require('./utils/logger');
var common = require('./utils/common');
var views = require('co-views');
var config = require('./config');
var session = require('koa-generic-session');
var _ = require('underscore');

var app = koa();
app.name = 'koa-session-test';
app.keys = ['koa', 'demo'];
var env = process.env.NODE_ENV || 'production';

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

app.use(function * (next) {
	var start = new Date;
	var _this = this;
	this.render = views(__dirname + "/views", {default:'ejs'})

	logger.access.info(this.req.url);

	yield next;

	var ms = new Date - start;
	console.log("%s %s - %sms", this.method, this.url, ms);
});

require('./routers')(app);

app.listen(config.PORT, () => {
	console.log("listening on port " + config.PORT + " ,env " + env);
});