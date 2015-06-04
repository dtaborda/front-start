define('dashboard.service', ['angularResource'],
	function(){
		'use strict';

		angular.module('dashboardServiceModule',['ngResource'])
			.factory('dashboardService',['$http',
				function dashboardService(http){
                    function getEntries() {
                        return http.get('http://localhost:8080/api/actors/ef380253-3e39-40fd-8895-de76927e6bd8/wall/entries');
                    }

					return {
                        getEntries: getEntries
                    };
				}
			]);
	}
);