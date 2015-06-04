define('app', [
		'angular',
		'configuration',
		'angular-material',
		'angular-router',
		'about.route',
		'home.route',
		'login.route',
		'about.controller',
		'home.controller',
		'login.controller',
		'nav-menu.component',
		'side-nav-menu.component',
		'component.component'
	],
	function(ng, config, angularMaterial, angularRouter, aboutRoute, homeRoute, loginRoute){
		'use strict';

		angular.module(config.applicationName,[
				'ui.router',
				'ngMaterial',
				'aboutControllerModule',
				'homeControllerModule',
				'loginControllerModule',
				'navMenuComponentModule',
				'sideNavMenuComponentModule',
				'componentComponentModule'
			])
			.run([
				'$rootScope',
				'$state',
				function($root, $state){
					$root.state = $state;
				}
			])
			.config([
				'$stateProvider',
				'$urlRouterProvider',
		        function ($stateProvider,$urlRouterProvider) {
		            $urlRouterProvider.otherwise('/');
		            aboutRoute($stateProvider);
		            homeRoute($stateProvider);
		            loginRoute($stateProvider);
		        }
		    ]);
	}
);