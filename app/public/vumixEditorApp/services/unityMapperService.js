(function() {
  angular.module('vumixEditorApp.services')
    .factory('unityMapperService', function($http) {      
      var service = {};
            
      service.setTransformMode = function(val) {
        SendMessage('Facade', 'SetTransformMode', val);
      };
      
      service.saveState = function(url) {
        SendMessage('Facade', 'SaveProgress', './uploadstate.php');
      };
      
      service.loadAllModels = function() {
        SendMessage('Facade', 'RequestModelInfo');
      }
      
      return service;
    }); 
})();