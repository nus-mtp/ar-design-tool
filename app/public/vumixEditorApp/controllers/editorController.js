(function() {
  angular.module('vumixEditorApp.controllers')
    .controller('editorController', function(
      $scope,
      $timeout,
      editorService,
      unityMapperService,
      stateService,
      modelService,
      loaderService
    ) {
      $scope.modelsSelected = false;
      $scope.currentStateId = -1;
      $scope.currentSelected;
      $scope.textModel = "";
      $scope.uploadError = "";
        
      $scope.modelsAvailable = [];
      $scope.modelsOnServer = [];
      $scope.modelsOnScreen = [];    
      
      editorService.subscribeToDisplayStateIdChange($scope, function() {
        $scope.currentStateId = editorService.id;
      });
      
      modelService.subscribeToServerModelChange($scope, function() {
        $scope.modelsOnServer = angular.copy(modelService.getAllServerModels()); 
      });
      
      modelService.subscribeToAssetBundleModelChange($scope, function() {
        $scope.modelsAvailable = angular.copy(modelService.getAllAssetBundleModels());
      });
      
      stateService.subscribeToStateChange($scope, function() {        
        $scope.modelsOnScreen = angular.copy(stateService.getStateObjects($scope.currentStateId));  
      });
      
      $scope.$watch('currentStateId', function(newVal, oldVal) {
        $scope.modelsOnScreen = angular.copy(stateService.getStateObjects(newVal));  
      });
      
      $scope.$watch('modelsOnServer', function() {
        $scope.modelsSelected = $scope.anyModelSelected();
      }, true);
      
      $scope.unityMapperService = unityMapperService;      
      $scope.editorService = editorService;
      
      $scope.addModelToScreen = function(object) {
        stateService.addStateObject($scope.currentStateId, object);        
      };
      
      $scope.removeModelFromScreen = function(object) {
        stateService.removeStateObject($scope.currentStateId, object);
      };
      
      $scope.addText = function(text) {
        stateService.addTextStateObject($scope.currentStateId, text);
      }
      
      $scope.selectModelOnScreen = function(object) {
        unityMapperService.setTargetStateObject(object.id);
        unityMapperService.setActiveGameObject();
      };
      
      $scope.uploadNewModel = function() {
        try {
          modelService.insertServerModel(event.target.files[0]);
          this.uploadError = "";
        } catch(e) {
          this.uploadError = e.message;
        } finally {
          this.$apply();
        }
      }
      
      $scope.deleteModelFromServer = function(model) {
        modelService.deleteServerModel(model);
      }
      
      $scope.addModelsToAssetBundle = function() {
        var _models = [];
        $scope.modelsOnServer.forEach(function(model){
          if (model.included) {
            _models.push(model);
          }
        });
        modelService.addAssetBundleModels(_models);
      }
      
      $scope.anyModelSelected = function() {
        if ($scope.modelsOnServer.length === 0) {
          return false;
        }
        return $scope.modelsOnServer.reduce(function(prev, next) {
          return {included: prev.included || next.included};
        }).included;  
      };
      
      $scope.removeModelFromAssetBundle = function(model) {
        loaderService.showLoader("Removing Model from Asset Bundle");
        var _models = $.grep($scope.modelsOnScreen, function(_model) {
          return _model.instanceName === model.name;
        });
        _models.forEach(function(_model) {
          $scope.removeModelFromScreen(_model);
        });
        modelService.deleteAssetBundleModel(model);
      };
      
      $('[data-toggle="tooltip"]').tooltip();
      
    }); 
})();