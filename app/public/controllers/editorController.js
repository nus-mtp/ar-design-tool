(function() {
  angular.module('ardesignApp.controllers')
    .controller('editorController', function(UnityMapper) {
      this.setTransformMode = UnityMapper.setTransformMode;
    }); 
})();