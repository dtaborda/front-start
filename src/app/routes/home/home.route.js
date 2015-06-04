define('home.route',['home.controller'],
	function(){
		'use strict';

		return function ($stateProvider) {
			$stateProvider
				.state('home',{
					url:'/',
					data: {
			            'selectedTab' : 0
			        },
					templateUrl:'app/routes/home/home.template.html',
					controller:'homeController as ctrl',
					title:'Home'
				});
    	};
	}
);