define('component.component',['angular'],
	function(){
		'use strict';

		angular.module('componentComponentModule',['ngMaterial'])
			.directive('component',[
				function(){
					var definition = {
						restrict: 'E',
						scope:{

						},
						controllerAs:'componentCtrl',
						bindToController: true,
						templateUrl: 'app/components/component/component.template.html',
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
								function buildToggler(navID) {
								  var debounceFn =  mdUtil.debounce(function(){
								        mdSidenav(navID)
								          .toggle()
								          .then(function () {
								            log.debug("toggle " + navID + " is done");
								          });
								      },300);
								  return debounceFn;
								};

								scope.closeLeft = function () {
									mdSidenav('left').close()
										.then(function () {
											log.debug("close LEFT is done");
										});
								};

								scope.closeRight = function () {
							      	mdSidenav('right').close()
							        	.then(function () {
							         	 	log.debug("close RIGHT is done");
							        	});
							    };

								var self = this;

								function init(){
									self.items = [
										{ title: 'Home', icon: 'flaticon-dwelling1', state:'home'  },
										{ title: 'About', icon: 'flaticon-menu45', state:'about'  },
										{ title: 'Login', icon: 'flaticon-menu45', state:'login'  }
									];

									scope.toggleLeft = buildToggler('left');
									scope.toggleRight = buildToggler('right');
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