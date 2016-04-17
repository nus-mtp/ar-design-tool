// this service serves as an API for states and models in asset bundles
(function() {
  angular.module('vumixEditorApp.services')
    .factory('stateService', function($rootScope, modelService, unityMapperService, $http) {  
      
      var service = {};
      var _state = {};
      _state.states = [];
      
      var notifyStateChange = function() {
        $rootScope.$emit('_$stateChange');
      };
      
      service.subscribeToStateChange = function($scope, callback) {
        var handler = $rootScope.$on('_$stateChange', callback);
        $scope.$on('$destroy', handler);
      };
      
// STATE APIS START HERE

      // get all states
      service.getAllStates = function() {
        return _state.states;
      }
      
      // get single state given id
      service.getStateById = function(id) {
        return $.grep(_state.states, function(state) {
          return state.id === id;
        })[0];
      }
      
      // get single state given name
      service.getStateByName = function(name) {
        return $.grep(_state.states, function(state) {
          return state.name === name;
        })[0];
      }
      
      // create state, given name
      service.createState = function(name) {
        // create state on localdb
        var newState = {
          id: _state.stateIndex++,
          name: name,
          modelIndex: 0,
          models: []
        };
        _state.states.push(newState);
        
        unityMapperService.createState();
        unityMapperService.setTargetState(_state.stateIndex - 1);
        unityMapperService.setStateName(name);
        
        // notify changes
        notifyStateChange();
        
        return newState;
      }
      
      service.removeState = function(id) {        
        // delete model from local db
        var removedState;
        _state.states = $.grep(_state.states, function(state) {
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
        
        return removedState;
      };
      
      service.sendGraph = function(graph) {
          var userid = uid;
          
          // var pid = window.location.href.split('/');
          // pid = pid[4]
          // pid = pid.slice(0, -1);
          var projectid = pid;
          
          var fd = new FormData();
          fd.append('uid' ,userid);
          fd.append('pid' ,projectid);
          fd.append('json', graph);
          var uploadUrl = '/saveproject';
    
          return $http.post(uploadUrl,fd, {
                headers: {'Content-Type': undefined}
            })
            .then(function(res){
                return res.data.data[0];
            }, function errorCallback(res){
                console.log("error adding the image");
            });
      }
// STATE APIS END HERE

// STATE OBJECT APIS START HERE

      // get all state models given id of state
      service.getStateObjects = function(id) {
        var state = this.getStateById(id);
        if (!state) {
          return [];
        }  
        return state.models;
      }
      
      // get all clickable state models
      service.getClickableStateObjects = function(id)
      {
        var state = this.getStateById(id);
        if (!state) {
          return [];
        }
        return $.grep(state.models, function(objectState) {
          return objectState.isClickable;
        });
      }
      
      service.addTextStateObject = function(stateId, text) {
        _state.states.forEach(function(state) {
          if (state.id === stateId) {
            var newStateObject = {
              instanceName: text,
              id: state.modelIndex++,
              isClickable: true,
              stateTransitionId: -1
            }
            state.models.push(newStateObject);
          }
        });
        unityMapperService.createText(text);
        notifyStateChange();
      }
      
      service.addStateObject = function(stateId, object) {
        _state.states.forEach(function(state) {
          if (state.id === stateId) {
            var newStateObject = {
              instanceName: object.name,
              id: state.modelIndex++,
              isClickable: true,
              stateTransitionId: -1
            }
            state.models.push(newStateObject);
          }
        });
        unityMapperService.createInstanceObject(object.id);
        notifyStateChange();
      }
      
      service.removeStateObject = function(stateId, object) {
        _state.states.forEach(function(state) {
          if (state.id === stateId) {
            state.models = $.grep(state.models, function(model) {
              return model.id != object.id;
            });
          }
        });
        unityMapperService.setTargetStateObject(object.id);
        unityMapperService.removeInstanceObject();
        notifyStateChange();
      }
      
// STATE OBJECT APIS END HERE

// STATE CONNECTION APIS START HERE

      _state.stateConn = [];
      
      var notifyStateConnectionChange = function() {
        $rootScope.$emit('_$stateConnChange');
      };
      
      service.subscribeToStateConnectionChange = function($scope, callback) {
        var handler = $rootScope.$on('_$stateConnChange', callback);
        $scope.$on('$destroy', handler);
      };
      
      service.getAllStateConnection = function() {
        return _state.stateConn;
      };
      
      service.stateExist = function(fromId, toId) {
        var _conn = $.grep(_state.stateConn, function(conn) {
          return conn.from === fromId && conn.to === toId;
        });
        return _conn.length > 0;
      };
      
      service.addStateConnection = function(fromId, toId) {
        if(!this.stateExist(fromId, toId)) {
          _state.stateConn.push({ from:fromId, to:toId });
          notifyStateConnectionChange();
        }
      };
      
// STATE CONNECTION APIS ENDS HERE

      // NOT SAFE TO CALL
      // add model to existing class, given name
      // id is auto generated, called by Unity
      service.addStateModel = function(stateModel) {
        var self = this;    
        var models = [];
        stateModel.modelNames.forEach(function(el, index) {
          var model = {
            id: index,
            name: el      
          };
          models.push(model);
        });
        
        modelService.setAssetBundleModels(models);
        modelService.setModelsAvailability();
        
        stateModel.states.forEach(function(el, index) {
          var state = {
            id: index,
            name: el.name,
            modelIndex: el.stateObjects.length, 
            models: el.stateObjects
          };
          _state.states.push(state);
          
          state.models.forEach(function(model) {
            if (model.transitionId >= 0) {
              var conn = { from:state.id, to:model.transitionId };
              if (!self.stateExist(conn.from, conn.to)) {
                _state.stateConn.push(conn);
              }
            }  
          });
          
        });
        
        _state.stateIndex = _state.states.length;
        notifyStateChange();
        notifyStateConnectionChange();
      };
            
      return service;
      
    });
})();