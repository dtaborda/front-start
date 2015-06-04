define('configuration', [],
	function(){
		'use strict';

		var menuItems = [
			{ title: 'home', icon: 'flaticon-dwelling1', state:'home'  },
			{ title: 'Ayuda', icon: 'flaticon-concentric', state:'about'  }
		];

		var host = 'http://reqr.es';

		return {
			applicationName: 'app',
			serviceBaseUrl: host,
			menuItems: menuItems
		};
	}
);

