define('pixels.controller',['angular','angular-youtube'],
	function(){
		'use strict';

		angular.module('pixelsControllerModule', ['ngMaterial','youtube-embed'])

			.controller('pixelsController',['$scope', '$mdDialog',function(scope, mdDialog){
                scope.theBestVideo = 'sMKoNBRZM1M';
                scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

                scope.showAdvanced = function(ev) {
                    mdDialog.show({
                      template: '<md-dialog aria-label="Video"><md-toolbar><div class="md-toolbar-tools"><h2>Mango (Fruit)</h2></div></md-toolbar><md-dialog-content><youtube-video video-id="sMKoNBRZM1M"></youtube-video></md-dialog-content></md-dialog>',
                      parent: angular.element(document.body),
                      targetEvent: ev,
                    })
                    .then(function(answer) {
                      scope.alert = 'You said the information was "' + answer + '".';
                    }, function() {
                      scope.alert = 'You cancelled the dialog.';
                    });
                  };


                }
			]);
	}
);