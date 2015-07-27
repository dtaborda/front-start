define('debugging.route',['debugging.controller'],
	function(){
		'use strict';

		return function ($stateProvider) {
			$stateProvider
				.state('debugging', {
					url: '/contacts',
					templateUrl: 'app/routes/debugging/debugging.template.html',
					controller: 'debuggingController as ctrl',
					title:'Contacts'
				});
    	};
	}
);