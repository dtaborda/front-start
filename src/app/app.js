define('app', [
		'angular',
		'configuration',
		'angular-material',
		'angular-router',
		'about.route',
		'home.route',
		'login.route',

		'pixels.route',
		'viewport.route',
		'debugging.route',

		'about.controller',
		'home.controller',
		'login.controller',

		'pixels.controller',
		'viewport.controller',
		'debugging.controller',

		'nav-menu.component',
		'side-nav-menu.component',
		'side-nav-user.component',
		'component.component'
	],
	function(ng, config, angularMaterial, angularRouter, aboutRoute, homeRoute, loginRoute, pixelsRoute, viewportRoute, debuggingRoute){
		'use strict';

		angular.module(config.applicationName,[
				'ui.router',
				'ngMaterial',
				'aboutControllerModule',
				'homeControllerModule',
				'loginControllerModule',
				'pixelsControllerModule',
				'viewportControllerModule',
				'debuggingControllerModule',
				'navMenuComponentModule',
				'sideNavMenuComponentModule',
				'sideNavUserComponentModule',
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
				'$mdThemingProvider',
		        function (stateProvider,urlRouterProvider,mdThemingProvider) {

		        	mdThemingProvider.theme('default')
    				.primaryPalette('blue')
    				.accentPalette('orange');

    				mdThemingProvider.theme('altTheme')
    				.primaryPalette('purple');

		            urlRouterProvider.otherwise('/');
		            aboutRoute(stateProvider);
		            homeRoute(stateProvider);
		            loginRoute(stateProvider);
		            pixelsRoute(stateProvider);
		            viewportRoute(stateProvider);
		            debuggingRoute(stateProvider);
		        }
		    ]);
	}
);