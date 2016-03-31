(function() {
  angular.module('vumixEditorApp.services')
  .factory('loaderService', function($rootScope) {
    var loader = false;
    var text = "";
    
    var notifyLoaderChange = function() {
      $rootScope.$emit('_$loaderChange');
    }
        
    var service = {};
      
    service.subscribeToLoaderChange = function($scope, callback) {
      var handler = $rootScope.$on('_$loaderChange', callback);
      $scope.$on('$destroy', handler);
    }
    
    service.showLoader = function(displayText) {
      text = displayText || "";
      loader = true;
      notifyLoaderChange();
    }
    
    service.hideLoader = function() {
      loader = false;
      notifyLoaderChange();
    }
    
    service.getLoaderStatus = function() {
      return loader;
    }
    
    service.getLoaderText = function() {
      return text;  
    }
    
    return service;
  });
})();