// Handle model
angular.module('vumixManagerApp.controllers')
    .controller('modelController', function (modelService, $http, $scope) {
        var file;
     
        $scope.models = [];
        $scope.model = {
            model_name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        };
        
        $scope.update = {
            model_name: "",
            file_size: "",
            file_extension: "",
            upload: undefined
        };
        

        var cookie = document.cookie.split(';')[0];
        var uid = cookie.split('=');
        $scope.userid = uid[1];
        $scope.model.image_url = "/resources/images/open_book.png";  //supposed to read from database
        
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return $scope.model.upload;
          };
          
        var extensionCheck = function() {
          var tokenised = $scope.model.upload.name.split('.');
          $scope.model.file_extension = tokenised[tokenised.length-1];
            if (tokenised.length < 1) {
              return false;
            }
            return tokenised[tokenised.length - 1] === 'obj' || tokenised[tokenised.length - 1] === 'fbx' || tokenised[tokenised.length - 1] === '3ds';
         };
         
         var extensionSizeCheck = function(){
           var tokenised = $scope.model.upload.size;
           if(tokenised > 8000000){
               return false;
           }
           return true;
         };
         
          
         $scope.$watch('model.upload', function(newVal, oldVal) {   
            $scope.modelForm.modelUpload.$setValidity('required', false); 
            $scope.modelForm.modelUpload.$setValidity('fileType', false); 
            if (requiredCheck()) {      
              $scope.modelForm.modelUpload.$setValidity('required', true);
              if (extensionCheck() && extensionSizeCheck()) {
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
            $scope.$apply();
        };
        
        $scope.getModel = function(id){
            for(var i = 0; i < $scope.models.length; i++){
                if(id === $scope.models[i].id){
                    $scope.update = $scope.models[i];
                }
            }
        };
        
        $scope.updateModel = function(id){
            modelService.updateModel($scope.models,$scope.update, $scope.userid,id)
            .then(function(update){
                $scope.model.model_name = update.name;
                $scope.model.file_size = update.file_size;
                $scope.model.file_extension = update.file_extension;
                $scope.model.image_url = update.image_url;
                $scope.model.upload = update.upload;
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
                $scope.models.push(model);
            });
        };
        
        $http({
            method: 'GET',
            url : '/api/users/' + $scope.userid +'/models'
        }).success(function(res){
            $scope.all = res.data;
 
            var length = $scope.all.length;
  
            for(i=0; i<length; i++){
                if($scope.all[i].file_extension == "obj" || $scope.all[i].file_extension == "fbx"){
                    $scope.models.push($scope.all[i]);
                }
            }
        });
    });
