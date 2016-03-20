// Handle model
angular.module('vumixManagerApp.controllers')
    .controller('modelController', function (modelService, $http, $scope) {
        var file;
     
        $scope.models = [];
        $scope.model = {
            model_name: "",
            file_size: "",
            file_extension: "",
            upload: undefined
        };
        
        var cookie = document.cookie.split(';')[2];
        $scope.userid = cookie.substring(5);
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return $scope.model.upload;
          }
          
        var extensionCheck = function() {
          var tokenised = $scope.model.upload.name.split('.');
            if (tokenised.length < 1) {
              return false;
            }
            return tokenised[tokenised.length - 1] === 'obj' || tokenised[tokenised.length - 1] === 'fbx' || tokenised[tokenised.length - 1] === '3ds';
         }
          
         $scope.$watch('model.upload', function(newVal, oldVal) {   
            $scope.modelForm.modelUpload.$setValidity('required', false); 
            $scope.modelForm.modelUpload.$setValidity('fileType', false); 
            if (requiredCheck()) {      
              $scope.modelForm.modelUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.modelForm.modelUpload.$setValidity('fileType', true); 
              }                            
            }
          });
        };
        
       $scope.$watch('modelForm', function(newVal, oldVal) {
          if (newVal) {
            onFormLoaded();
          }
        });     
       
        $scope.uploadFile = function(){
            file = event.target.files[0];
            $scope.model.upload = file;
            $scope.model.file_size = file.size;
            $scope.model.file_extension = file.type;
            $scope.$apply();
        };
        
        $scope.getModel = function(id){
            for(var i = 0; i < $scope.models.length; i++){
                if(id === $scope.models[i].id){
                    $scope.model = $scope.models[i];
                }
            }
        };
        
        $scope.updateModel = function(id){
            modelService.updateModel($scope.models,$scope.model, $scope.userid,id)
            .then(function(model){
                $scope.model = model;
            });
        };
        
        $scope.deleteModel = function(id){
            modelService.deleteModel($scope.models, $scope.userid, id)
                .then(function(model) {
                //  console.log($scope.models);
            });
        };       
        
        $scope.addModel = function(){
           modelService.addModel($scope.model, $scope.model.upload, $scope.userid)
                .then(function(model) {
                console.log(model);
                $scope.models.push(model);
            });
        };
        
        $http({
            method: 'GET',
            url : '/api/users/' + $scope.userid +'/models'
        }).success(function(res){
            $scope.models = res.data;
        });
    });
