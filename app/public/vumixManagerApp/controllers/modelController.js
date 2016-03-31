// Handle model
angular.module('vumixManagerApp.controllers')
    .controller('modelController', function (modelService, $http, $scope) {
<<<<<<< HEAD
        var filename;
     
=======
        var file;
        
        $scope.empty = {
            model_name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        };

>>>>>>> scss
        $scope.models = [];
        $scope.model = {
            model_name: "",
            file_size: "",
            file_extension: "",
            upload: undefined
        };
        
<<<<<<< HEAD
        $scope.userid = 1;
        
        $scope.uploadFile = function(){
            filename = event.target.files[0].name;
            $scope.model.upload = filename;
        };
        
        $scope.getModel = function(id){
          modelService.getModel($scope.models, $scope.userid,id)
            .then(function(model){
                $scope.model = model;
            });
        };
        
        $scope.updateModel = function(id){
            modelService.updateModel($scope.models,$scope.model, $scope.userid,id)
            .then(function(model){
                $scope.model = model;
=======
             
        $scope.update = {
            id: "",
            name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        }; 

        var cookie = document.cookie.split(';')[0];
        var uid = cookie.split('=');
        $scope.userid = uid[1];
        
        $scope.model.image_url = "/resources/images/open_book.png";  //supposed to read from database
        $scope.update.image_url = "/resources/images/open_book.png";
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return $scope.model.upload;
          };
          
        var extensionCheck = function() {
          var tokenised = $scope.model.upload.name.split('.');
          $scope.model.file_extension = tokenised[tokenised.length-1].toLowerCase();
            if (tokenised.length < 1) {
              return false;
            }
            if ($scope.model.file_extension !== 'obj'){
                $scope.modelForm.modelUpload.$setValidity('fileType', false);
            }else if ($scope.model.file_extension !== 'fbx'){
                $scope.modelForm.modelUpload.$setValidity('fileType', false);
            }else if ($scope.model.file_extension !== '3ds'){
                $scope.modelForm.modelUpload.$setValidity('fileType', false);
            }
            return tokenised[tokenised.length - 1].toLowerCase() === 'obj' || tokenised[tokenised.length - 1].toLowerCase() === 'fbx' || tokenised[tokenised.length - 1].toLowerCase() === '3ds';
         };
         
         var extensionSizeCheck = function(){
           var tokenised = $scope.model.upload.size;
           if(tokenised > 8000000){
               $scope.modelForm.modelUpload.$setValidity('fileSize', false);  
               return false;
           }
           return true;
         };
         
          
         $scope.$watch('model.upload', function(newVal, oldVal) {   
            $scope.modelForm.modelUpload.$setValidity('required', false); 
            if (requiredCheck()) {      
              $scope.modelForm.modelUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.modelForm.modelUpload.$setValidity('fileType', true);   
              }
              if ( extensionSizeCheck()){
                $scope.modelForm.modelUpload.$setValidity('fileSize', true);
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
        
        $scope.updateFile = function(){
            file = event.target.files[0];
            $scope.update.upload = file;
            $scope.update.file_size = file.size;
            $scope.$apply();
        };
        
        $scope.getModel = function(id){
            for(var i = 0; i < $scope.models.length; i++){
                if(id === $scope.models[i].id){
                   $scope.update.id = id;
                   $scope.update.name = $scope.models[i].name;
                   $scope.update.file_size = $scope.models[i].file_size;
                   $scope.update.file_extension = $scope.models[i].file_extension;
                   $scope.update.upload = $scope.models[i].upload;
                }
            }
        };
        
        $scope.updateModel = function(id){
            modelService.updateModel($scope.models,$scope.update, $scope.update.upload,$scope.userid,id)
            .then(function(update){
                 $scope.model = update;
>>>>>>> scss
            });
        };
        
        $scope.deleteModel = function(id){
            modelService.deleteModel($scope.models, $scope.userid, id)
                .then(function(model) {
                //  console.log($scope.models);
            });
        };       
        
        $scope.addModel = function(){
           modelService.addModel($scope.model.model_name, $scope.model.file_size, $scope.model.file_extension, $scope.model.upload, $scope.userid)
                .then(function(model) {
                $scope.models.push(model);
                $scope.reset();
            });
        };
        
        $scope.reset = function(){
            $("#upload_file").val("");
            $scope.empty.image_url = $scope.model.image_url;
            $scope.model = angular.copy($scope.empty);
        };
        
        $http({
            method: 'GET',
            url : '/api/users/1/models'
        }).success(function(res){
            $scope.models = res.data;
        });
    })
.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});
