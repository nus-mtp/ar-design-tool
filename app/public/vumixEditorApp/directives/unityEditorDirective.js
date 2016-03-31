(function() {
  angular.module('vumixEditorApp.directives')
    .directive('unityEditor', function($timeout) {
      var tmpl = "";
      
      tmpl += '<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" height="{{ height }}" width="{{ width }}"></canvas>';
      
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        template: tmpl,
        link: function($scope, $el, $attr, $ctrl) {
          $scope.height = '627px';          
          $scope.width = '1000px';
          
          $timeout(function() {
            $.getScript("/resources/webgl/TemplateData/UnityProgress.js");
            $.getScript("/resources/webgl/Release/UnityLoader.js");
          }, 0);          
        }
      }
    });
})();