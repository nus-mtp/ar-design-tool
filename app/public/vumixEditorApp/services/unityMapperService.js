(function() {
  angular.module('vumixEditorApp.services')
    .factory('unityMapper', function() {
      return {
        setTransformMode: function(val) {
<<<<<<< HEAD
          SendMessage("Control Scripts", "SetTransformMode", val);
=======
          SendMessage("EditorPlayer", "SetTransformMode", val);
>>>>>>> master
        }
      };
    }); 
})();