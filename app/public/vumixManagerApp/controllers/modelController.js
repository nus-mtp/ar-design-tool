(function() {
    angular.module('vumixManagerApp.controllers')
      .controller('modelController', function (modelService, $http, $scope) {
        var file;
        
        $scope.empty = {
            model_name: "",
            file_size: "",
            file_extension: "",
            image_url: "",
            upload: undefined
        };

        $scope.models = [];
        $scope.model = {
            model_name: "",
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
        $scope.userid = uid;
        
        $scope.model.image_url = "/resources/images/open_book.png";  //supposed to read from database
        $scope.update.image_url = "/resources/images/open_book.png";
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return {
                file : $scope.model.upload,
                model_name : $scope.model.model_name
            };
          };
          
        var extensionCheck = function() {
          var Data = requiredCheck();
          var tokenised = Data.file.name.split('.');
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
         
         var checkSimilarity = function() {
            var Data = requiredCheck();
            
            if(checkSimilarModelName(Data.model_name)){
                $scope.modelForm.modelName.$setValidity('fileName', false);
                return true;
            }
            return false;
         };
          
         var checkSimilarModelName = function(val){
            for(var i = 0; i < $scope.models.length; i++){
                if(val === $scope.models[i].name){
                    return true;
                } 
            }
            return false;
         };
         
          
         $scope.$watch('model.upload', function(newVal, oldVal) {   
            $scope.modelForm.modelUpload.$setValidity('required', false); 
            var Data = requiredCheck();
            
            if (Data.file) {      
              $scope.modelForm.modelUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.modelForm.modelUpload.$setValidity('fileType', true);   
              }
              if ( extensionSizeCheck()){
                $scope.modelForm.modelUpload.$setValidity('fileSize', true);
              }                            
            }
          });
          
          $scope.$watch('model.model_name', function(newVal, oldVal){
            var Data = requiredCheck();
            
            if(Data.model_name){
              if(!checkSimilarity()){
                  $scope.modelForm.modelName.$setValidity('fileName', true);
              }
            }
          });
          
        };
        
        var updateFormLoaded = function (){
          var requiredCheck = function() {
            return {
                file : $scope.update.upload,
                project_name : $scope.update.name
            };
          };
          
          var extensionSizeCheck = function(){
            var tokenised = $scope.update.upload.size;
            if(tokenised > 8000000){
                $scope.updateModelForm.updateUpload.$setValidity('fileSize', false);  
                return false;
            }
            return true;
          };
          
          var extensionCheck = function() {
            var Data = requiredCheck();
            var tokenised = Data.file.name.split('.');
            $scope.update.file_extension = tokenised[tokenised.length-1].toLowerCase();
            if (tokenised.length < 1) {
              return false;
            }
           
            if ($scope.update.file_extension !== 'obj'){
                $scope.updateModelForm.updateUpload.$setValidity('fileType', false);
            }else if ($scope.update.file_extension !== 'fbx'){
                $scope.updateModelForm.updateUpload.$setValidity('fileType', false);
            }else if ($scope.update.file_extension !== '3ds'){
                $scope.updateModelForm.updateUpload.$setValidity('fileType', false);
            }
            return tokenised[tokenised.length - 1].toLowerCase() === 'obj' || tokenised[tokenised.length - 1].toLowerCase() === 'fbx' || tokenised[tokenised.length - 1].toLowerCase() === '3ds';
            
          };
          
          $scope.$watch('update.upload', function(newVal, oldVal) {
            $scope.updateModelForm.updateUpload.$setValidity('required', false);
            var Data = requiredCheck();
    
            if (Data.file) {      
              $scope.updateModelForm.updateUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.updateModelForm.updateUpload.$setValidity('fileType', true); 
              }
              if (extensionSizeCheck()){
                $scope.updateModelForm.updateUpload.$setValidity('fileSize', true);
              }                            
            }
          });
        };
        
        $scope.$watch('modelForm', function(newVal, oldVal) {
          if (newVal) {
            onFormLoaded();
          }
        });
        
        $scope.$watch('updateModelForm', function(newVal, oldVal){
          if (newVal){
            updateFormLoaded();   
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
             
            $("#welcome_model").hide();
            $("#upload_model").hide(); 
            $("#update_page").show();
        };
        
        $scope.updateModel = function(id){
            $("#update_page").hide();
            $("#welcome_model").show();
            modelService.updateModel($scope.models,$scope.update, $scope.update.upload,$scope.userid,id)
            .then(function(update){
                 $scope.model = update;
            });
        };
        
        $scope.deleteModel = function(id){
            modelService.deleteModel($scope.models, $scope.userid, id)
                .then(function(model) {
            });
        };       
        
        $scope.addModel = function(){
           modelService.addModel($scope.model, $scope.model.upload, $scope.userid)
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
            url : '/api/users/' + $scope.userid +'/models'
        }).success(function(res){
            $scope.all = res.data;
 
            var length = $scope.all.length;
  
            for(i=0; i<length; i++){
                if($scope.all[i].file_extension == "obj"){
                    $scope.models.push($scope.all[i]);
                } else if ($scope.all[i].file_extension == "3ds"){
                    $scope.models.push($scope.all[i]);
                } else if ($scope.all[i].file_extension == "fbx"){
                    $scope.models.push($scope.all[i]);
                }
            }
        });
    });
 })();   