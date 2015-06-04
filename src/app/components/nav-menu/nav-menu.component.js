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
							function navMenuController(scope){

								var vm = this;

								//scope.currentTab = 2;

								function currentTab(){
									return vm.currentTab
								};

								function init(){
									vm.items = [
										{ title: 'Home', icon: 'flaticon-dwelling1', state:'home'  },
										{ title: 'About', icon: 'flaticon-menu45', state:'about'  },
										{ title: 'Login', icon: 'flaticon-menu45', state:'login'  }
									];

									angular.extend(vm, {
										currentTab: currentTab
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