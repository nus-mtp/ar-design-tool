(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerController', function(
      $scope,
      $window,
      $timeout,
      VisDataSet,
      editorService,
      unityMapperService,
      stateService,
      notificationService
    ) {            
      $scope.editMode = false;
      $scope.deleteMode = false;
      $scope.notifications = [];
      
      $scope.graphData = { nodes:new VisDataSet(), edges:new VisDataSet() };
      $scope.graphOptions = { interaction: { selectConnectedEdges:false } };
      $scope.graphEvents = {
        doubleClick: function(event) {
          if (event.nodes.length > 0) {
            if ($scope.editMode) {
              $("#edit-state").modal('show');
              $scope.modal.id = event.nodes[0];
            } else if ($scope.deleteMode) {
              // delete connected edges of the graph 
              // deleting the connected edges and free the model
              var connectedEdges = this.nodesHandler.getConnectedEdges(parseInt(event.nodes[0]));
              connectedEdges.forEach(function(connId) {
                _conn = $scope.graphData.edges.get(connId);
                stateService.removeStateConnection(_conn.from, _conn.to);
              });
              $scope.graphData.edges.remove(connectedEdges);
              // delete the relevant node
              var deletedState = stateService.removeState(parseInt(event.nodes[0]));
              $scope.graphData.nodes.remove(deletedState.id);       
              // tell angular to apply changes to the scope network       
              if (deletedState) {
                $scope.$apply();
              }           
            } else {
              var name = stateService.getStateById(parseInt(event.nodes[0])).name;
              editorService.openEditor(event.nodes[0], name);
              if(!$scope.$$phase) {
                $scope.$apply();
              }
            }
          } else if (event.edges.length > 0) {
            if ($scope.editMode) {
              var _conn = $scope.graphData.edges.get(event.edges[0]);
              $scope.connEditor.selectedConnector = _conn;
              $scope.connEditor.selectedModels = angular.copy(stateService.getStateObjects(_conn.from));
              $scope.connEditor.selectedModels.forEach(function(model) {
                // set included to true if the model has transition state
                if (model.stateTransitionId === -1) {
                  model.included = false;
                } else {
                  model.included = true;
                }
              });
              $scope.$apply();
              $("#edit-connector").modal('show');
            } else if ($scope.deleteMode) {
              var _conn = $scope.graphData.edges.get(event.edges[0]);
              stateService.removeStateConnection(_conn.from, _conn.to);
              $scope.graphData.edges.remove(event.edges);
              $scope.$apply();             
            }
          }
        }
      };
      
      $scope.notificationService = notificationService;
      $scope.editorService = editorService;    
      $scope.unityMapperService = unityMapperService;
      $scope.buildApkLink = "/users/"+uid+"/projects/"+pid+"/buildproject";
      
      stateService.subscribeToStateChange($scope, function() {
        var _states = angular.copy(stateService.getAllStates());
        var visNode = [];
        _states.forEach(function(_state) {
          visNode.push({ id:_state.id, label:_state.name, shape:'box' });
        });
        $scope.graphData.nodes.update(visNode);
      });      
      
      stateService.subscribeToStateConnectionChange($scope, function() {
        var _conn = angular.copy(stateService.getAllStateConnection());
        _conn.forEach(function(conn) {
          conn.arrows = { to:true };
          conn.smooth = { enabled:true, type:'diagonalCross' };
        });
        $scope.graphData.edges.update(_conn);
      });
      
      notificationService.subscribeToNotificationsChange($scope, function() {
        $scope.notifications = angular.copy(notificationService.getAllNotifications());  
      });
      
      $scope.saveState = function() {
        unityMapperService.saveState();
        notificationService.addFreeNotification("success", " - Project has been saved successfully");
      };
      
      $scope.buildState = function() {
        $window.open("/users/"+uid+"/projects/"+pid+"/buildproject");
      };
      
      $scope.$on('$_editModeChanged', function(event, data) {
        $scope.editMode = data.editMode;
      });

      $scope.$on('$_deleteModeChanged', function(event, data) {
        $scope.deleteMode = data.deleteMode;
      });
      
      $timeout(function() {
        $scope.modal.stateEditorForm.nameStateEditor.$setValidity('duplicate', true); 
      }, 0);
      
      $scope.modal = {};
      
      // state editor modal
      
      $scope.stateEditor = {};
      $scope.stateEditor.name = "";
      
      $scope.$watch("stateEditor.name", function() {
        if (stateService.getStateByName($scope.stateEditor.name)) {
          $scope.modal.stateEditorForm.nameStateEditor.$setValidity('duplicate', false); 
        } else {
          $scope.modal.stateEditorForm.nameStateEditor.$setValidity('duplicate', true); 
        }
      });
      
      $scope.changeStateProperties = function() {
        stateService.setStateName(parseInt($scope.modal.id), $scope.stateEditor.name);
        $scope.stateEditor.name = "";
      };
      
      // conenctor editor modal
      
      $scope.connEditor = {};
      $scope.connEditor.selectedConnector = {};
      $scope.connEditor.selectedModels = [];
            
      $scope.changeConnProperties = function() {
        $scope.connEditor.selectedModels.forEach(function(model) {
          // change transition id only if the direction is toward the edge has not selectedConnector
          // the reason is because if the model is already selected for the other node,
          // it will be re-assigned since, it is ticked.
          if (model.included && model.stateTransitionId === -1) {
            model.stateTransitionId = $scope.connEditor.selectedConnector.to;
          } else if (!model.included) {
            model.stateTransitionId = -1;
          }
        });
        stateService.updateStateObject($scope.connEditor.selectedConnector.from, $scope.connEditor.selectedModels);
      };
      
      $scope.getStateName = function(id) {
        return stateService.getStateById(parseInt(id)) ? stateService.getStateById(parseInt(id)).name : "";
      };
      
    });
})();