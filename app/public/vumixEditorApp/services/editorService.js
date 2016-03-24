(function() {
  angular.module('vumixEditorApp.services')
    .factory('editorService', function(unityMapperService) {
      var service = {};
      
      service.open = false;
      service.id = -1;
      
      var notifyDisplayStateIdChange = function() {
        $rootScope.$emit('_$displayStateIdChange');
      }
      
      service.subscribeToDisplayStateIdChange = function($scope, callback) {
        var handler = $rootScope.$on('_$displayStateIdChange', callback);
        $scope.$on('$destroy', handler);
      }
      
      service.openEditor = function(id) {
          this.id = id;
          unityMapperService.setTargetState(id);
          unityMapperService.displayState();
          this.open = true;
      };
      
      service.closeEditor = function() {
          this.open = false;
      };
    
      return service;
    }); 
})();