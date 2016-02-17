(function() {
  angular.module('vumixEditorApp.services')
    .factory('unityMapper', function() {
      return {
        setTransformMode: function(val) {
          SendMessage("EditorPlayer", "SetTransformMode", val);
        }
      }
    }); 
})();