// Handle model
angular.module('vumixManagerApp.controllers')
    .controller('imageController', function (imageService, $http, $scope) {
        var file;
        
        $scope.empty = {
            image_name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        };
        
        $scope.images = [];
        
        $scope.image = {
            image_name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        };
        
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
        
        $scope.image.image_url = "/resources/images/charger.png";
        $scope.update.image_url = "/resources/images/charger.png";
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return {
                file : $scope.image.upload,
                image_name : $scope.image.image_name
            };
          };
          
          var extensionCheck = function() {
            var Data = requiredCheck();
            var tokenised = Data.file.name.split('.');
            $scope.image.file_extension = tokenised[tokenised.length-1].toLowerCase();
                if (tokenised.length < 1) {
                $scope.imageForm.imageUpload.$setValidity('fileType', false); 
                return false;
                }
                if ($scope.image.file_extension !== 'png'){
                    $scope.imageForm.imageUpload.$setValidity('fileType', false); 
                } else if ($scope.image.file_extension !== 'jpg'){
                    $scope.imageForm.imageUpload.$setValidity('fileType', false); 
                } else if ($scope.image.file_extension !== 'jpeg'){
                    $scope.imageForm.imageUpload.$setValidity('fileType', false); 
                }
                return tokenised[tokenised.length - 1].toLowerCase() === 'png' || tokenised[tokenised.length - 1].toLowerCase() === 'jpg' || tokenised[tokenised.length - 1].toLowerCase() === 'jpeg';
         };
            
         var extensionSizeCheck = function(){
          var tokenised = $scope.image.upload.size;
           if(tokenised > 4000000){
               $scope.imageForm.imageUpload.$setValidity('fileSize', false);
               return false;
           }
           return true;
         };
         
         var checkSimilarity = function() {
            var Data = requiredCheck();
            
            if(checkSimilarImageName(Data.image_name)){
                $scope.imageForm.imageName.$setValidity('fileName', false);
                return true;
            }
            return false;
         };
          
         var checkSimilarImageName = function(val){
            for(var i = 0; i < $scope.images.length; i++){
                if(val === $scope.images[i].name){
                    return true;
                } 
            }
            return false;
         };
         
         $scope.$watch('image.upload', function(newVal, oldVal) {   
            $scope.imageForm.imageUpload.$setValidity('required', false);
            var Data = requiredCheck();
             
            if (Data.file) {      
              $scope.imageForm.imageUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.imageForm.imageUpload.$setValidity('fileType', true); 
               
              }
              if (extensionSizeCheck()){
                $scope.imageForm.imageUpload.$setValidity('fileSize', true);
              }                            
            }
          });
          
          $scope.$watch('image.image_name', function(newVal, oldVal){
            var Data = requiredCheck();
            if(Data.image_name){
                if(!checkSimilarity()){
                    $scope.imageForm.imageName.$setValidity('fileName', true);
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
        
        $scope.updateFile = function(){
            file = event.target.files[0];
            $scope.update.upload = file;
            $scope.update.file_size = file.size;
            $scope.$apply();
        };
        
        $scope.getImage = function(id){
            console.log($scope.images);
            for(var i = 0; i < $scope.images.length; i++){
               if(id === $scope.images[i].id){
                    $scope.update.id = id;
                    $scope.update.name = $scope.images[i].name;
                    $scope.update.file_size = $scope.images[i].file_size;
                    $scope.update.file_extension = $scope.images[i].file_extension;
                    $scope.update.upload = $scope.images[i].upload;
                }
            }
        };
        
        $scope.updateImage = function(id){
            imageService.updateImage($scope.images, $scope.update, $scope.update.upload, $scope.userid,id)
            .then(function(update){
                $scope.image = update;
            });
        };
        
        $scope.deleteImage = function(id){
            imageService.deleteImage($scope.images, $scope.userid, id)
                .then(function(image) {
            });
        };       
        
        $scope.addImage = function(){
           imageService.addImage($scope.image, $scope.image.upload, $scope.userid)
                .then(function(image) {
                $scope.images.push(image);
                $scope.reset();
            });
        };
        
        $scope.reset = function(){
            $("#upload_file").val("");
            $scope.empty.image_url = $scope.image.image_url;
            $scope.image = angular.copy($scope.empty);
        };
        
        $http({
            method: 'GET',
            url : '/api/users/' + $scope.userid +'/models'
        }).success(function(res){
            $scope.all = res.data;
 
            var length = $scope.all.length;
  
            for(i=0; i<length; i++){
                if($scope.all[i].file_extension == "jpeg"){
                    $scope.images.push($scope.all[i]);
                } else if($scope.all[i].file_extension == "png"){
                    $scope.images.push($scope.all[i]);
                } else if ($scope.all[i].file_extension == "jpg"){
                    $scope.images.push($scope.all[i]);
                }
            }
        });
    });
