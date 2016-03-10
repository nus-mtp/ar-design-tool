(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerController', function(
      $scope,
      editorService
    ) {
      $scope.editorService = editorService;
    }); 
})();