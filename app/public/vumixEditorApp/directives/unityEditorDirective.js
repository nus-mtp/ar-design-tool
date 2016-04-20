(function() {
  angular.module('vumixEditorApp.directives')
    .directive('unityEditor', function($timeout, $window) {
      var tmpl = "";
      tmpl += '<canvas id="overlay-canvas" oncontextmenu="event.preventDefault()" height="{{ height }}" width="{{ width }}"></canvas>';
      tmpl += '<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" height="{{ height }}" width="{{ width }}"></canvas>';
      
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        template: tmpl,
        link: function($scope, $el, $attr, $ctrl) {
          $scope.height = $window.outerHeight - 100;          
          $scope.width = $window.innerWidth - 300;
          
          angular.element($window).bind('resize', function(evt) {
            if (this === evt) {              
              $scope.height = $window.outerHeight - 100;          
              $scope.width = $window.innerWidth - 300;
            }
          });
          
          $timeout(function() {
            $.getScript("/resources/webgl/TemplateData/UnityProgress.js");
            $.getScript("/resources/webgl/Release/UnityLoader.js");
          }, 0);          
          
          // draw the image
          var drawImage = function() {
            
          }
        }
      }
    });
})();