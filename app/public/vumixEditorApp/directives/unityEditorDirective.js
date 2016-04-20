(function() {
  angular.module('vumixEditorApp.directives')
    .directive('unityEditor', function($timeout, $window) {
      var tmpl = "";
      tmpl += '<canvas style="position:absolute; z-index:2;" id="overlay-canvas" oncontextmenu="event.preventDefault()" height="{{ overlayHeight }}" width="{{ overlayWidth }}"></canvas>';
      tmpl += '<canvas style="position:absolute; z-index:1;" class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" height="{{ height }}" width="{{ width }}"></canvas>';
      
      return {
        restrict: 'E',
        scope: true,
        template: tmpl,
        link: function($scope, $el, $attr, $ctrl) {          
                    
          $scope.height = $window.outerHeight - 100;          
          $scope.width = $window.innerWidth - 300;
          $scope.overlayHeight = 150;
          $scope.overlayWidth = 200;
          
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
          
        }
      }
    });
})();