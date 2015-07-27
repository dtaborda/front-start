define('viewport.route',['viewport.controller'],
	function(){
		'use strict';

		return function ($stateProvider) {
			$stateProvider
				.state('viewport', {
					url: '/viewport',
					templateUrl: 'app/routes/viewport/viewport.template.html',
					controller: 'viewportController as ctrl',
					title:'Viewport'
				});
    	};
	}
);