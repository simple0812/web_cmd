var Router = require('koa-router');
var ctrl = require('../controllers/work');

module.exports = function(app, prefix) {
	prefix = prefix || '';
	var opt = prefix ? {prefix : prefix} : {};
	var router = Router(opt);


	router.get('/v', ctrl.render);
	router.get('/cmd', ctrl.handle);

	app
		.use(router.routes())
	  .use(router.allowedMethods());
};