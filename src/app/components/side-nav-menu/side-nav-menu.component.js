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
							function navMenuController(scope){

								var self = this;

								function init(){
									self.items = [
										{ title: 'Home', icon: 'flaticon-dwelling1', state:'home'  },
										{ title: 'About', icon: 'flaticon-menu45', state:'about'  },
										{ title: 'Login', icon: 'flaticon-menu45', state:'login'  }
									];
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