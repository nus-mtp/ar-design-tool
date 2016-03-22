(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('editorController', function(
      $scope,
      editorService,
      unityMapperService,
      stateModelService
    ) {
      $scope.modelsOnScreen = [];
      
      $scope.modelsAvailable = [];
      
      $scope.unityMapperService = unityMapperService;
      
      $scope.editorService = editorService;
      
      $scope.addModelToScreen = function(object) {
        var _obj = angular.copy(object);
        _obj.clickable = false;
        $scope.modelsOnScreen.push(_obj);
      }
      
      $scope.getAllModels = function() {
        $scope.modelsAvailable = stateModelService.getAllModels();
      }
    }); 
})();