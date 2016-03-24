(function() {
  angular.module('vumixEditorApp.directives')
    .directive('bsModal', function() {
      var tmpl = "";
      tmpl += '<div class="modal fade" id="{{id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">';
      tmpl +=   '<div class="modal-dialog modal-sm" role="document">';
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
        scope: {
          id: "@modalId"
        },
        replace: true,
        transclude: {
          body: "modalBody",
          footer: "modalFooter"
        },
        template: tmpl,
        compile: function($tEl, $tAttrs) {
          return {
            post: function($scope, $el, $attrs, $ctrl) {
              var modalBody = $el.find('modal-body').children();
              var modalFooter = $el.find('modal-footer').children();
              $el.find('ng-transclude').remove();
              $el.find('.modal-body').append(modalBody);
              $el.find('.modal-footer').append(modalFooter);
            }
          };
        }
      }
    });
})();