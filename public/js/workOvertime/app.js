require.config({
	baseUrl: '/js'
});

require(['lib/validator', 'lib/bootstrap', 'workOvertime/service',  'workOvertime/usersCtrl',  'workOvertime/controller', 'workOvertime/filter',
	'workOvertime/editCtrl', 'workOvertime/directive'], function() {
	validator.bind();
	angular.module('myApp', ['moduleListCtrl', 'moduleDetailCtrl', 'moduleSvc', 'moduleFilter', 'moduleDirect']);
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['myApp']);
	});
});
