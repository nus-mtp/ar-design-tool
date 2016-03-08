(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('editorController', function(
      $scope,
      unityMapperService, 
      editorService
    ) {
      $scope.setTransformMode = unityMapperService.setTransformMode;
      
      $scope.editorService = editorService;
    }); 
})();