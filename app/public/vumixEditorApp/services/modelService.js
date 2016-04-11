// this service serves as an API for models available on the server
(function() {
  angular.module('vumixEditorApp.services')
    .factory('modelService', function($rootScope, $http, loaderService) {  
      var _models = {};
      _models.onAssetBundle = [];
      _models.onServer = [];
      
      var service = {};
      
      var notifyAssetBundleModelChange = function() {
        $rootScope.$emit('_$assetBundleModelChange');
      }
      
      var notifyServerModelChange = function() {
        $rootScope.$emit('_$serverModelChange');
      }
      
      service.subscribeToAssetBundleModelChange = function($scope, callback) {
        var handler = $rootScope.$on('_$assetBundleModelChange', callback);
        $scope.$on('$destroy', handler);
      }
      
      service.subscribeToServerModelChange = function($scope, callback) {
        var handler = $rootScope.$on('_$serverModelChange', callback);
        $scope.$on('$destroy', handler);
      }
      
// ASSETBUNDLES OBJECT APIS START HERE   

      service.getAllAssetBundleModels = function() {
        return _models.onAssetBundle;
      }
      
      service.setAssetBundleModels = function(models) {
        _models.onAssetBundleIndex = models.length;
        _models.onAssetBundle = angular.copy(models);
        notifyAssetBundleModelChange();
      }
      
      service.addAssetBundleModels = function(serverModels) {
        var _modelIds = [];
        var url = '/api/users/' + uid + '/projects/models';
        serverModels.forEach(function(model) {
          var _model = {
            id: _models.onAssetBundleIndex++,
            name: serverModels
          }
        });        
        var data = {
          pid: pid,
          ids: _modelIds
        }
        return $http.post(url, data);
      }
      
// ASSETBUNDLES OBJECT APIS END HERE

// SERVER OBJECT APIS START HERE      

      service.getAllServerModels = function() {
        return _models.onServer;
      }
      
      service.insertServerModel = function(file) {
        var url = '/api/users/' + uid + '/models';
        var fileSplit = file.name.split('.');
        var tokenisedName = fileSplit.splice(0, fileSplit.length - 1).join('');
        var tokenisedExt = fileSplit[0].toLowerCase();
        if (
          tokenisedExt !== 'fbx' &&
          tokenisedExt !== 'obj' &&
          tokenisedExt !== '3ds'
        ) {
          throw { message:"[ERROR] Invalid file extenstion" };
        }
        _models.onServer.forEach(function(model) {
          if (model.name === tokenisedName) {
            throw { message:"[ERROR] Model with same name exists" };
          }
        });        
        // If pass all the check        
        var fd = new FormData();
        fd.append('file', file);
        fd.append('uid', uid);
        fd.append('model_name', tokenisedName);
        fd.append('file_size', file.size);
        fd.append('file_extension', tokenisedExt);
        loaderService.showLoader("Adding Model to Database");
        return $http.post(url, fd, {
          headers: {'Content-Type': undefined}
        }).then(function(res) {
          loaderService.hideLoader();
          _models.onServer.push(res.data.data[0]);
          notifyServerModelChange();
        });
      }
      
      service.deleteServerModel = function(model) {
        loaderService.showLoader("Removing Model from Server")
        return $http({
          method: 'DELETE',
          url: '/api/users/' + uid + '/models/' + model.id 
        }).then(function(res) {
          loaderService.hideLoader();
          var _model = res.data.data[0];
          _models.onServer.forEach(function(el, index) {
            if (el.id === _model.id) {
              _models.onServer.splice(index, 1);
            }
          });
          notifyServerModelChange();
        });
      }
      
      service.setModelsAvailability = function() {
        var _availableModelNames = [];
        _models.onAssetBundle.forEach(function(model) {
          _availableModelNames.push(model.name);
        });
        _models.onServer.forEach(function(model) {
          if (_availableModelNames.indexOf(model.name) >= 0) {
            model.available = true;
          }
        });  
        notifyServerModelChange();
      }
      
// SERVER OBJECT APIS END HERE         
      
      $http.get('/api/users/'+ uid + '/models').then(function(res) {
        var models = angular.copy(res.data.data);
        models.forEach(function(el, index) {
          el.included = false;
        });
        _models.onServer = models;
        service.setModelsAvailability();
        notifyServerModelChange();
      }).catch(function(err) {
        console.log(err);
      });
      
      return service;
    });
})();