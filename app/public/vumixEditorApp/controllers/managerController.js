(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerController', function(
      $scope,
      editorService,
      unityMapperService
    ) {
      $scope.editorService = editorService;
      
      $scope.unityMapperService = unityMapperService
    }); 
})();