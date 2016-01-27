angular
	.module('app', [
		'ui.router'
	])
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/home.dot'
			})
	}])