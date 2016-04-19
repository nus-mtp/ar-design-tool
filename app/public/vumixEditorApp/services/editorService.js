(function() {
  angular.module('vumixEditorApp.services')
    .factory('editorService', function($rootScope, unityMapperService) {
      var service = {};
      
      service.open = false;
      service.preview = false;
      service.id = 0;
      service.name = "";
      
      var notifyDisplayStateIdChange = function() {
        $rootScope.$emit('_$displayStateIdChange');
      }
      
      service.subscribeToDisplayStateIdChange = function($scope, callback) {
        var handler = $rootScope.$on('_$displayStateIdChange', callback);
        $scope.$on('$destroy', handler);
      }
      
      service.openEditor = function(id, name) {
          this.id = id;
          this.name = name;
          unityMapperService.setTargetState(parseInt(id));
          unityMapperService.displayState();
          notifyDisplayStateIdChange();
          this.open = true;
      };
      
      service.closeEditor = function() {
          this.open = false;
      };
      
      service.togglePreview = function() {
        if (this.preview) {
          unityMapperService.closePreview();
          this.preview = false;
        } else {
          unityMapperService.openPreview();
          this.preview = true;
        }
      };
      
      return service;
    }); 
})();