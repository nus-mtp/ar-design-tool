(function() {
  angular.module('vumixEditorApp.directives')
    .directive('stateViewer', function() {
      var tmpl = "";
      tmpl += "<div>";
      tmpl += "</div>";
      return {
        restrict: 'E',
        template: tmpl
      }
    });
})();