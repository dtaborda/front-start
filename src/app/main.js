(function(){
	'use strict';

	require.config({
		baseUrl: '/',
		paths:{
			'app':'app/app',
			'configuration':'app/config/main.config',
			'angular':'vendor/angular/angular',
			'angular-router':'vendor/angular-ui-router/release/angular-ui-router.min',
			'angular-aria':'vendor/angular-aria/angular-aria',
			'angular-animate':'vendor/angular-animate/angular-animate',
			'angular-material':'vendor/angular-material/angular-material',
			'jquery':'vendor/jquery/dist/jquery.min',
			'about.route':'app/routes/about/about.route',
			'about.controller':'app/routes/about/about.controller',
			'home.route':'app/routes/home/home.route',
			'home.controller':'app/routes/home/home.controller',
			'login.route':'app/routes/login/login.route',
			'login.controller':'app/routes/login/login.controller',
			'nav-menu.component': 'app/components/nav-menu/nav-menu.component',
			'side-nav-menu.component': 'app/components/side-nav-menu/side-nav-menu.component',
			'component.component': 'app/components/component/component.component'
		},
		shim:{
			'angular':{
				exports: 'angular',
				deps:['jquery']
			},
			'angular-aria':{
				deps:['angular']
			},
			'angular-animate':{
				deps:['angular']
			},
			'angular-material':{
				deps:['angular', 'angular-aria', 'angular-animate']
			},
			'angular-router':{
				deps:['angular']
			}
		}
	});

	require(['app', 'configuration'],
		function(app, config){
			angular.element(document).ready(function() {
			  	angular.bootstrap(document.querySelector('html'), [
			    	config.applicationName
			  	], {
			    	strictDi: true
			  	});
			});
	});
})();