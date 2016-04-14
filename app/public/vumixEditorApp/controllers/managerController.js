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
      
      $scope.goToManager = function(){
          window.location.href=  "/#/manager";
      } 

      $scope.buildApkLink = "/users/"+uid+"/projects/"+pid+"/buildproject"
    }); 
})();