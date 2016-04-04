(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerController', function(
      $scope,
      editorService,
      unityMapperService,
      stateService
    ) {
      $scope.editorService = editorService;
     
      $scope.unityMapperService = unityMapperService;   
    }); 
})();