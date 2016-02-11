(function() {
  angular.module('ardesignApp.services')
    .factory('UnityMapper', function() {
      return {
        setTransformMode: function(val) {
          SendMessage("EditorPlayer", "SetTransformMode", val);
        }
      }
    }); 
})();