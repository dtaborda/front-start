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
									/*vm.items = [
										{ title: 'Home', icon: '', state:'home'  },
										{ title: 'Pixels', icon: '', state:'pixels'  },
										{ title: 'Meta Viewport', icon: '', state:'viewport'  },
										{ title: 'Debugging', icon: '', state:'debugging'  },
										{ title: 'Media Queries', icon: '', state:'about'  },
										{ title: 'Responsive Tables', icon: '', state:'login'  }
									];*/

									vm.items = [
										{ title: 'Home', icon: '', state:'home'  },
										{ title: 'Videos', icon: '', state:'pixels'  },
										{ title: 'Contacts', icon: '', state:'debugging'  }
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