(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('editorController', function(
      $scope,
      editorService,
      unityMapperService,
      stateModelService
    ) {
      $scope.currentStateId = 0;
      
      $scope.modelsOnScreen = [];      
      $scope.modelsAvailable = [];
      
      stateModelService.subscribeToModelChange($scope, function() {
        $scope.modelsAvailable = angular.copy(stateModelService.getAllModels());
      });
      
      $scope.unityMapperService = unityMapperService;      
      $scope.editorService = editorService;
      
      $scope.addModelToScreen = function(object) {
        
      }
    }); 
})();