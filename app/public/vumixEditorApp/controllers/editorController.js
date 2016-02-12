(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('editorController', function(unityMapper) {
      this.setTransformMode = unityMapper.setTransformMode;
    }); 
})();