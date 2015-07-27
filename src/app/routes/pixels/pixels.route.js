define('pixels.route',['pixels.controller'],
	function(){
		'use strict';

		return function ($stateProvider) {
			$stateProvider
				.state('pixels', {
					url: '/videos',
					templateUrl: 'app/routes/pixels/pixels.template.html',
					controller: 'pixelsController as ctrl',
					title:'Videos'
				});
    	};
	}
);