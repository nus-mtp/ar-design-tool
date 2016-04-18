(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('managerSidebarController', function(
      $scope,
      $timeout,
      stateService,
      unityMapperService
    ) {
      
      $scope.stateCreation = {};
      $scope.stateCreation.name = "";
      $scope.stateCreation.from = "";
      $scope.stateCreation.to = "";
      $scope.editMode = false;
      $scope.deleteMode = false;
      
      $scope.states = [];      
      
      stateService.subscribeToStateChange($scope, function() {
        $scope.states = angular.copy(stateService.getAllStates());
      });
      
      $timeout(function() {
        $scope.stateCreationForm.nameStateCreation.$setValidity('duplicate', true); 
        $scope.connCreationForm.toConnCreation.$setValidity('required', true);   
        $scope.connCreationForm.toConnCreation.$setValidity('self', true);    
      }, 0);
      
      $scope.$watch("stateCreation.name", function() {
        if (stateService.getStateByName($scope.stateCreation.name)) {
          $scope.stateCreationForm.nameStateCreation.$setValidity('duplicate', false); 
        } else {
          $scope.stateCreationForm.nameStateCreation.$setValidity('duplicate', true); 
        }
      });
      
      $scope.$watchGroup(["stateCreation.from", "stateCreation.to"], function() {
        if ($scope.stateCreation.from === "" || $scope.stateCreation.to === "") {
          $scope.connCreationForm.toConnCreation.$setValidity('empty', false);           
        } else {
          $scope.connCreationForm.toConnCreation.$setValidity('empty', true);        
          if ($scope.stateCreation.from.id === $scope.stateCreation.to.id) {
            $scope.connCreationForm.toConnCreation.$setValidity('self', false);                   
          } else {
            $scope.connCreationForm.toConnCreation.$setValidity('self', true);                   
          }        
          if (stateService.stateExist($scope.stateCreation.from.id, $scope.stateCreation.to.id)) {
            $scope.connCreationForm.toConnCreation.$setValidity('duplicate', false);                 
          } else {
            $scope.connCreationForm.toConnCreation.$setValidity('duplicate', true);     
          }
        }
      });
      
      $scope.$watch("editMode", function() {
        $scope.$emit('$_editModeChanged', { editMode:$scope.editMode });
        $scope.stateCreationForm.nameStateCreation.$setValidity('editmode', !$scope.editMode);
        $scope.connCreationForm.toConnCreation.$setValidity('editmode', !$scope.editMode);  
      });
      
      $scope.$watch("deleteMode", function() {
        $scope.$emit('$_deleteModeChanged', { deleteMode:$scope.deleteMode });
        $scope.stateCreationForm.nameStateCreation.$setValidity('deletemode', !$scope.deleteMode);
        $scope.connCreationForm.toConnCreation.$setValidity('deletemode', !$scope.deleteMode);         
      });
      
      $scope.stateCreationSubmit = function() {
        stateService.createState($scope.stateCreation.name);
        $scope.stateCreation.name = "";
      };
      
      $scope.connCreationSubmit = function() {
        stateService.addStateConnection($scope.stateCreation.from.id, $scope.stateCreation.to.id);
        $scope.stateCreation.from = "";
        $scope.stateCreation.to = "";
      };
      
      $scope.unityMapperService = unityMapperService;
      
      $scope.toggleEditMode = function() {
        $scope.editMode = !$scope.editMode;
      };
      
      $scope.toggleDeleteMode = function() {
        $scope.deleteMode = !$scope.deleteMode;
      };
      
    }); 
})();