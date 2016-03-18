(function() {
  angular.module('vumixEditorApp.services')
    .factory('editorService', function() {
      var service = {};
      
      service.open = false;
      
      service.openEditor = function() {
          service.open = true;
      };
      
      service.closeEditor = function() {
          service.open = false;
      };
    
      return service;
    }); 
})();