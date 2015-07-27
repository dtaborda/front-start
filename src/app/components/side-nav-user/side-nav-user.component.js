define('side-nav-user.component',['angular'],
	function(){
		'use strict';

		angular.module('sideNavUserComponentModule',['ngMaterial'])
			.directive('sideNavUser',[
				function(){
					var definition = {
						restrict: 'E',
						scope:{

						},
						controllerAs:'sideNavUsertCtrl',
						bindToController: true,
						templateUrl: 'app/components/side-nav-user/side-nav-user.template.html',
						replace:true,
						link: function(scope){

						},
						controller: [
							'$scope',
							'$timeout',
							'$mdSidenav',
							'$mdUtil',
							'$log',
							function navMenuController(scope, timeout, mdSidenav, mdUtil, log){
								/**
								 * Build handler to open/close a SideNav; when animation finishes
								 * report completion in console
								 */
								scope.closeRight = function () {
							      	mdSidenav('right').close()
							        	.then(function () {
							         	 	log.debug("close RIGHT is done");
							        	});
							    };

								var self = this;

								function init(){

								}

								init();
							}
						]
					};

					return definition;
				}
			]);
	}
);