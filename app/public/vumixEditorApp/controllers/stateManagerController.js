(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('stateManagerController', function() {
      this.display = function(){
          $urlRouter.go('editor');
      };
    }); 
})();