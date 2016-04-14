(function() {
  angular.module('vumixEditorApp.directives')
    .directive('loader', function(loaderService) {
      var template = '';
      template += '<div class="loader-wrapper" ng-show="loaderStatus">';
      template += '  <div class="loader">';
      template += '  </div>';
      template += '  <p class="loader-status">{{ loaderText }}</p>'
      template += '</div>';
      return {
        restrict: 'E',
        template: template,
        link: function($scope, $el, $attr, $controller) {
          $scope.loaderStatus = loaderService.getLoaderStatus();
          $scope.loaderText = loaderService.getLoaderText();
          
          loaderService.subscribeToLoaderChange($scope, function() {    
            $scope.loaderStatus = loaderService.getLoaderStatus();
            $scope.loaderText = loaderService.getLoaderText();
            if(!$scope.$$phase) {
              $scope.$apply();
            }
          });
        }
      };
    });
})();