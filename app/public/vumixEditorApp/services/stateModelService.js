(function() {
  angular.module('vumixEditorApp.services')
    .factory('stateModelService', function($rootScope, unityMapperService) {  
      
      var service = {};
      var _stateModel = {};
      _stateModel.models = [];
      _stateModel.states = [];
      
      var notifyModelChange = function() {
        $rootScope.$emit('_$modelChange');
      }
      
      var notifyStateChange = function() {
        $rootScope.$emit('_$stateChange');
      }
      
      service.subscribeToModelChange = function($scope, callback) {
        var handler = $rootScope.$on('_$modelChange', callback);
        $scope.$on('$destroy', handler);
      }
      
      service.subscribeToStateChange = function($scope, callback) {
        var handler = $rootScope.$on('_$stateChange', callback);
        $scope.$on('$destroy', handler);
      }
      
// MODEL APIS START HERE

      // get all models
      service.getAllModels = function() {
        return _stateModel.models;
      }     
      
// MODEL APIS END HERE

// STATE APIS START HERE

      // get all states
      service.getAllStates = function() {
        return _stateModel.states;
      }
      
      // create state, given name
      service.createState = function(name) {
        // create state on localdb
        var newState = {
          id: _stateModel.stateIndex++,
          name: name,
          modelIndex: 0,
          models: []
        };
        _stateModel.states.push(newState);
        
        unityMapperService.createState();
        unityMapperService.setTargetState(_stateModel.stateIndex - 1);
        // notify changes
        notifyStateChange();
        
        return newState;
      }
      
      service.removeState = function(id) {        
        // delete model from local db
        var removedState;
        _stateModel.states = $.grep(_stateModel.states, function(state) {
          if(state.id === id) {
            removedState = state;
          }
          return state.id != id;
        });
        
        // delete from webgl
        unityMapperService.setTargetState(id);
        unityMapperService.deleteState();
        
        // notify changes
        notifyStateChange();
        
        return state;
      }
      
// STATE APIS END HERE

// STATE MODEL APIS START HERE

      
      
// STATE MODEL APIS END HERE

      // NOT SAFE TO CALL
      // add model to existing class, given name
      // id is auto generated, called by Unity
      service.addStateModel = function(stateModel) {
        var self = this;    
        stateModel.modelNames.forEach(function(el, index) {
          var model = {
            id: index,
            name: el      
          };
          _stateModel.models.push(model);
        });
        
        _stateModel.modelIndex = _stateModel.models.length;
        notifyModelChange();
        
        stateModel.states.forEach(function(el, index) {
          var state = {
            id: index,
            name: el.name,
            modelIndex: el.stateObjects.length, 
            models: el.stateObjects
          };
          _stateModel.states.push(state);
        });
        
        _stateModel.stateIndex = _stateModel.states.length;
        notifyStateChange();
      };
      
      return service;
    });
})();