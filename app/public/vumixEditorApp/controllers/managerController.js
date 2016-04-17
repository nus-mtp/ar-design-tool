(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerController', function(
      $scope,
      $window,
      VisDataSet,
      editorService,
      unityMapperService,
      stateService
    ) {            
      $scope.editMode = false;
      $scope.deleteMode = false;
      
      $scope.graphData = { nodes:new VisDataSet(), edges:new VisDataSet() };
      $scope.graphOptions = { interaction: { selectConnectedEdges:false } };
      $scope.graphEvents = {
        doubleClick: function(event) {
          if (event.nodes.length > 0) {
            if ($scope.editMode) {
              $("#edit-state").modal('show')
            } else if ($scope.deleteMode) {
              // delete state           
            } else {
              var name = stateService.getStateById(parseInt(event.nodes[0])).name;
              editorService.openEditor(event.nodes[0], name);
              if(!$scope.$$phase) {
                $scope.$apply();
              }
            }
          } else if (event.edges.length > 0) {
            if ($scope.editMode) {
              // edit edge
            } else if ($scope.deleteMode) {
              // delete edge
            }
          }
        }
      };
      
      $scope.editorService = editorService;    
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
      
      $scope.saveState = function() {
        unityMapperService.saveState();
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
      
    }); 
})();