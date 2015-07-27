define('auth.service',['angular','angularResource','configuration'],
	function(ng, angularResource, configuration){
		'use strict';

		angular.module('authServiceModule', ['ngResource'])
			.factory('authDataContext', [
				'$resource',
				function authDataContext($resource){

					var resources = $resource(configuration.serviceBaseUrl + '/:controller/:action', {  }, {
                        login: { method: 'POST', params: { controller: 'login' }, headers:{ username:'@email', password:'@password' }, isArray: false },
                    });

					/** @function
					 * Logs in against a restful service, the service returns an object, in case status != "ok", the object cames with a "message" property
					 * explaining why the log in failed
					 * @name login
					 * @param {object} data -authentication data { email : {string}, password: {string}, rememberMe: {boolean} };
					 * @summary Performs log in against the server
					 */
                    function login(data){
                    	var promise = resources.login(data);
                    	promise
                    		.$promise
							/**
							* @argument {object} responseData  -authentication response { result : [{ status: "ok"|"error", message: {string}, access_token: {string} }] };
							*/
                    		.then(function onLoginResponse(responseData){

	                			responseData = responseData.result && responseData.result.length && responseData.result[0];

	                			var data = {
	                				disabledItems:[],
	                				token: null
	                			};

	                			if(responseData && responseData.status === 'ok'){
	                    			data.disabledItems = [];
	                    			/*jshint ignore:start*/
	                    			data.token = responseData.access_token;
									/*jshint ignore:end*/
	                			}
	                			else{
	                				promise.reject(responseData);
	                			}
	                    		return data;
	                    	})
	                    	.catch(function onLoginError(responseData){
	                    		responseData.message = responseData.message || 'An error has ocurred, please try again';
	                    	});

                    	return promise;
                    }

					return {
						login: login
					};
				}
			])
			.factory('authService',[
				'authDataContext',
				'$window',
				'$q',
				function authService(dc, $window, $q){

					var authData = {
						token: 'null',
						menuItems: configuration.menuItems,
						user: {}
					},

					menuItemsPromise = $q.defer();

					/** @function
					 * @name login */
					function login(data){

						var result = dc.login(data);

						return result.$promise
							.then(function onLoginOk(response){
								authData.token = response.token;

								authData.newUser = !!response.newUser;
								authData.user = response.user || {};
								disableMenuItems(response.disabledItems);

								// place token on configuration to avoid dependency of auth service on http injector
								configuration.token = authData.token;

								return response;
							});
					}

					/** @function
					 * @name isUserAuthenticated
					 * @returns {Boolean} wheter if the user is authenticated or not */
					function isUserAuthenticated(){
						return !!authData.token;
					}

					/** @function
					 * Notifys the subscribers of Menu Items with the current list of menu items and their availability.
					 * @name getMenuItems */
					function getMenuItems(){
						menuItemsPromise.notify(authData.menuItems);
					}

					/** @function
					 * @name getUserData
					 * @returns {Object} the user information like name and email */
					function getUserData(){
						return authData.user;
					}

					return {
						login:login,
						isUserAuthenticated: isUserAuthenticated,
						getMenuItems:getMenuItems,
						getUserData: getUserData
					};
				}
			]);
	}
);