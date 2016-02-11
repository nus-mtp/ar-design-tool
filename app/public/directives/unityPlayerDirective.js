(function() {
  angular.module('ardesignApp.directives')
    .directive('unityPlayer', function() {
      return {
        restrict: "E",
        template:'<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()"></canvas>',
        link: function($scope, $el, $attrs) {
          $el.height = $(window).height() - 80;
          $el.width = $(window).width() - 300;
        }
      }
    });
})();