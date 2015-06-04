define('login.route',['login.controller'],
	function(){
		'use strict';

		return function ($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					data: {
			            'selectedTab' : 2
			        },
					templateUrl: 'app/routes/login/login.template.html',
					controller: 'loginController as ctrl',
					title:'Login'
				});
    	};
	}
);