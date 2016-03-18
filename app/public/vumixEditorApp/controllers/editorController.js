(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('editorController', function(
      $scope,
      editorService,
      unityMapperService 
    ) {
      $scope.objectsOnScreen = [];
      
      $scope.objectsAvailable = [];
      
      $scope.unityMapperService = unityMapperService;
      
      $scope.editorService = editorService;
      
      $scope.addObjectToScreen = function(object) {
        var _obj = angular.copy(object);
        _obj.clickable = false;
        $scope.objectsOnScreen.push(_obj);
      }
      
      $scope.fetchAllModels = function() {
        $scope.objectsAvailable = unityMapperService.fetchAllObjects();
      }
    }); 
})();