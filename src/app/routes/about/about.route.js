define('about.route',['about.controller'],
	function(){
		'use strict';

		return function ($stateProvider) {
			$stateProvider
				.state('about',{
					url:'/about',
					data: {
			            'selectedTab' : 1
			        },
                    templateUrl:'app/routes/about/about.template.html',
					controller:'aboutController as ctrl',
					title:'About'
				});
    	};
	}
);