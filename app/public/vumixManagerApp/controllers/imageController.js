// Handle model
angular.module('vumixManagerApp.controllers')
    .controller('imageController', function (imageService, $http, $scope) {
        var file;
     
        $scope.images = [];
        $scope.image = {
            image_name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        };
        
        $scope.update = {
            image_name: "",
            file_size: "",
            file_extension: "",
            upload: undefined
        };
        
        var cookie = document.cookie.split(';')[0];
        var uid = cookie.split('=');
        $scope.userid = uid[1];
        $scope.image.image_url = "/resources/images/charger.png";
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return $scope.image.upload;
          };
          
        var extensionCheck = function() {
          var tokenised = $scope.image.upload.name.split('.');
          $scope.image.file_extension = tokenised[tokenised.length-1];
            if (tokenised.length < 1) {
              return false;
            }
            return tokenised[tokenised.length - 1] === 'png' || tokenised[tokenised.length - 1] === 'jpg';
         };
         
         var extensionSizeCheck = function(){
          var tokenised = $scope.image.upload.size;
           if(tokenised > 2000000){
               return false;
           }
           return true;
         };
         
         $scope.$watch('image.upload', function(newVal, oldVal) {   
            $scope.imageForm.imageUpload.$setValidity('required', false); 
            $scope.imageForm.imageUpload.$setValidity('fileType', false); 
            if (requiredCheck()) {      
              $scope.imageForm.imageUpload.$setValidity('required', true);
              if (extensionCheck() && extensionSizeCheck()) {
                $scope.imageForm.imageUpload.$setValidity('fileType', true); 
              }                            
            }
          });
        };
        
       $scope.$watch('imageForm', function(newVal, oldVal) {
          if (newVal) {
            onFormLoaded();
          }
        });     
       
        $scope.uploadFile = function(){
            file = event.target.files[0];
            $scope.image.upload = file;
            $scope.image.file_size = file.size;
            $scope.$apply();
        };
        
        $scope.getImage = function(id){
            for(var i = 0; i < $scope.images.length; i++){
                if(id === $scope.images[i].id){
                    $scope.update = $scope.images[i];
                }
            }
        };
        
        $scope.updateImage = function(id){
            imageService.updateImage($scope.images,$scope.update, $scope.userid,id)
            .then(function(image){
                $scope.image.image_name = update.name;
                $scope.image.file_size = update.file_size;
                $scope.image.file_extension = update.file_extension;
                $scope.image.image_url = update.image_url;
                $scope.image.upload = update.upload;
            });
        };
        
        $scope.deleteImage = function(id){
            imageService.deleteImage($scope.images, $scope.userid, id)
                .then(function(image) {
                //  console.log($scope.models);
            });
        };       
        
        $scope.addImage = function(){
           imageService.addImage($scope.image, $scope.image.upload, $scope.userid)
                .then(function(image) {
                    console.log(image);
                $scope.images.push(image);
            });
        };
        
        $http({
            method: 'GET',
            url : '/api/users/' + $scope.userid +'/models'
        }).success(function(res){
            $scope.all = res.data;
 
            var length = $scope.all.length;
  
            for(i=0; i<length; i++){
                if($scope.all[i].file_extension == "png" || $scope.all[i].file_extension == "jpg"){
                    $scope.images.push($scope.all[i]);
                }
            }
        });
    });
