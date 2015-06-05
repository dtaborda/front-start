define('nav-menu.component',['angular'],
	function(){
		'use strict';

		angular.module('navMenuComponentModule',['ngMaterial'])
			.directive('navMenu',[
				function(){
					var definition = {
						restrict: 'E',
						scope:{

						},
						controllerAs:'navigationCtrl',
						bindToController: true,
						templateUrl: 'app/components/nav-menu/nav-menu.template.html',
						replace:true,
						link: function(scope){
							var vm = this;
							scope.$root.$on('$stateChangeSuccess', function(event, toState) {
								//vm.currentTab = toState.data.selectedTab;
								console.log(event);
								console.log(toState);
							});
						},

						controller: [
							'$scope',
							'$timeout',
							'$mdSidenav',
							'$mdUtil',
							'$log',
							function navMenuController(scope,timeout,mdSidenav,mdUtil,log){

								var vm = this;
							    /**
							     * Build handler to open/close a SideNav; when animation finishes
							     * report completion in console
							     */
							    function buildToggler(navID) {
							      var debounceFn = mdUtil.debounce(function(){
							            mdSidenav(navID)
							              .toggle()
							              .then(function () {
							                log.debug("toggle " + navID + " is done");
							              });
							          },300);
							      return debounceFn;
							    };

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

									vm.toggleLeft = buildToggler('left');
								    vm.toggleRight = buildToggler('right');

									angular.extend(vm, {

									});
								}

								init();
							}
						]
					};

					return definition;
				}
			])
			.directive('myUiSref',['$state',
				function(state){
					var definition = {
						restrict: 'A',
						link: function(scope, elem, attr){
							console.log('Elem: ',elem)
							elem.on('click', function(){
								state.go(attr.myUiSref);
							});
						}
					};

					return definition;
				}]);
	}
);