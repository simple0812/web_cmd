var Router = require('koa-router');
var router = Router();

module.exports = function(app) {
	require('./work')(app);
};