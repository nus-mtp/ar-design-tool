(function() {
  angular.module('vumixEditorApp.services')
    .factory('unityMapperService', function() {
      var service = {};
      
      service.setTransformMode = function(val) {
        SendMessage("Control Scripts", "SetTransformMode", val);
      };
      
      return service;
    }); 
})();