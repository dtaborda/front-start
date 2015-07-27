define('debugging.controller',['angular'],
	function(){
		'use strict';

		angular.module('debuggingControllerModule', ['ngMaterial'])
			.controller('debuggingController',['$scope', function(scope,mdThemingProvider){


					var self = this;
					self.querySearch = querySearch;
					self.allContacts = loadContacts();
					self.contacts = [self.allContacts[0]];
					self.filterSelected = true;
					/**
		 			 * Search for contacts.
		 			 */
					function querySearch (query) {
		  			var results = query ?
			  		self.allContacts.filter(createFilterFor(query)) : [];
		  			return results;
					}
					/**
				 	 * Create filter function for a query string
				 	 */

					function createFilterFor(query) {
					  var lowercaseQuery = angular.lowercase(query);
					  return function filterFn(contact) {
						return (contact._lowername.indexOf(lowercaseQuery) != -1);;
					  };
					}

					function loadContacts() {
					  var contacts = [
						'Marina Augustine',
						'Oddr Sarno',
						'Nick Giannopoulos',
						'Narayana Garner',
						'Anita Gros',
						'Some-guy withlastaname',
						'Megan Smith',
						'Tsvetko Metzger',
						'Hector Simek'
					  ];
					  return contacts.map(function (c, index) {
						var cParts = c.split(' ');
						var contact = {
						  name: c,
						  email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
						  image: 'http://lorempixel.com/150/150/people?' + index
						};
						contact._lowername = contact.name.toLowerCase();
						return contact;
					  });
					}

				}
			]);
	}
);