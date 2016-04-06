(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerController', function(
      $scope,
      editorService,
      unityMapperService,
      stateModelService
    ) {
      $scope.editorService = editorService;
     
      $scope.unityMapperService = unityMapperService;  
      
      $scope.goToManager = function(){
          window.location.href=  "/#/manager";
      } 
    }); 
})();