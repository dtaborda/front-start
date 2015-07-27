define('home.controller', ['angular'],
	function(){
		'use strict';

		angular.module('homeControllerModule',['ngMaterial'])

			.controller('homeController',[
                '$scope',
                function(scope){
                    scope.imagePath ="images/product_img_1.jpg";

                    scope.items = [];

                    function item(id){
                        this.src = "http://lorempixel.com/200/200/people?" + id;
                        this.comment = "The titles of Washed Out's breakthrough song and the first single from Paracosm share the two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...";
                    };

                    for (var i = 0; i < 20; i++) {
                        scope.items.push(new item(i));
                    };

                    console.log(scope.items);
				}
			]);
	}
);