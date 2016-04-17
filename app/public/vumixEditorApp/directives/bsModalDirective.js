(function() {
  angular.module('vumixEditorApp.directives')
    .directive('bsModal', function($rootScope) {
      var tmpl = "";
      tmpl += '<div class="modal fade" id="{{id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
      tmpl +=   '<div class="modal-dialog modal-{{size}}" role="document">';
      tmpl +=     '<div class="modal-content">';
      tmpl +=       '<div class="modal-body">';
      tmpl +=         '<ng-transclude ng-transclude-slot="body">';
      tmpl +=       '</div>';
      tmpl +=       '<div class="modal-footer">';
      tmpl +=         '<ng-transclude ng-transclude-slot="footer">';
      tmpl +=       '</div>';
      tmpl +=     '</div>';
      tmpl +=   '</div>';
      tmpl += '</div>';
      return {
        restrict: 'E',
        scope: true,
        replace: true,
        transclude: {
          body: "modalBody",
          footer: "modalFooter"
        },
        template: tmpl,
        compile: function($tEl, $tAttrs) {
          return {
            post: function($scope, $el, $attrs) {
              var modalBody = $el.find('modal-body').children();
              var modalFooter = $el.find('modal-footer').children();
              $scope.id = $attrs.modalId;
              $scope.size = $attrs.modalSize;
              if(!$scope.$$phase) {
                $scope.$apply();
              }
            }
          };
        }
      }
    });
})();