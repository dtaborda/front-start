define('side-nav-menu.component',['angular'],
	function(){
		'use strict';

		angular.module('sideNavMenuComponentModule',['ngMaterial'])
			.directive('sideNavMenu',[
				function(){
					var definition = {
						restrict: 'E',
						scope:{

						},
						controllerAs:'sideNavigationCtrl',
						bindToController: true,
						templateUrl: 'app/components/side-nav-menu/side-nav-menu.template.html',
						replace:true,
						link: function(scope){

						},
						controller: [
							'$scope',
							'$timeout',
							'$mdSidenav',
							'$mdUtil',
							'$log',
							function navMenuController(scope,timeout,mdSidenav,mdUtil,log){

								var vm = this;

								function closeSideNav(id) {
							    	mdSidenav(id).close()
							        	.then(function () {
							          		log.debug("close " + id + " is done");
							        	});
							    };

								function init(){
									vm.items = [
										{ title: 'Home', icon: 'flaticon-dwelling1', state:'home'  },
										{ title: 'About', icon: 'flaticon-menu45', state:'about'  },
										{ title: 'Login', icon: 'flaticon-menu45', state:'login'  }
									];

									angular.extend(vm, {
										closeSideNav: closeSideNav
									});
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