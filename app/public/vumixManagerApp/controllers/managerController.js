(function() {
    angular.module('vumixManagerApp.controllers')
      .controller('managerController', function (projectService, $http, $scope, $timeout, $window) {
        var file;
        
        $scope.empty = {
            project_name: "",
            company_name: "",
            marker_type: "2D",
            image_url: "",  
            upload: undefined
        };
        
        $scope.projects = [];
       
        $scope.project = {
            project_name: "",
            company_name: "",
            marker_type: "2D",
            image_url: "",  
            upload: undefined
        };
        
        $scope.update = {
            id: "",
            name: "",
            com_name: "",
            marker_type: "2D",
            image_url: "",    
            upload: undefined
        };
                  

        
        $scope.userid = uid;
        $scope.project.image_url = "/resources/images/logo_white.png";
        $scope.update.image_url = "/resources/images/logo_white.png";
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return {
                file : $scope.project.upload,
                project_name : $scope.project.project_name
            };
          };
          
          var extensionCheck = function() {
            var Data = requiredCheck();
            var tokenised = Data.file.name.split('.');
            if (tokenised.length < 1) {
              return false;
            }
            if( tokenised[1] !== 'unitypackage'){
                $scope.addProjectForm.projectUpload.$setValidity('fileType', false); 
            }
            return tokenised[tokenised.length - 1] === 'unitypackage';
          };
          
          var checkSimilarity = function() {
            var Data = requiredCheck();
            
            if(checkSimilarProjectName(Data.project_name)){
                $scope.addProjectForm.projectName.$setValidity('fileName', false);
                return true;
            }
            return false;
          };
          
          var checkSimilarProjectName = function(val){
            for(var i = 0; i < $scope.projects.length; i++){
                if(val === $scope.projects[i].name){
                    return true;
                } 
            }
            return false;
          };
          
          $scope.$watch('project.upload', function(newVal, oldVal) {   
            $scope.addProjectForm.projectUpload.$setValidity('required', false);
            var Data = requiredCheck();
    
            if (Data.file) {      
              $scope.addProjectForm.projectUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.addProjectForm.projectUpload.$setValidity('fileType', true); 
              }                            
            }
            
          });
          
          $scope.$watch('project.project_name', function(newVal, oldVal){
            var Data = requiredCheck();
            
            if(Data.project_name){
              if(!checkSimilarity()){
                  $scope.addProjectForm.projectName.$setValidity('fileName', true);
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
          
          var extensionCheck = function() {
            var Data = requiredCheck();
            var tokenised = Data.file.name.split('.');
            if (tokenised.length < 1) {
              return false;
            }
            if( tokenised[1] !== 'unitypackage'){
                $scope.updateProjectForm.updateUpload.$setValidity('fileType', false); 
            }
            return tokenised[tokenised.length - 1] === 'unitypackage';
          };
          
          $scope.$watch('update.upload', function(newVal, oldVal) {   
            $scope.updateProjectForm.updateUpload.$setValidity('required', false);
            var Data = requiredCheck();
    
            if (Data.file) {      
              $scope.updateProjectForm.updateUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.updateProjectForm.updateUpload.$setValidity('fileType', true); 
              }                            
            }
          });
          
        };
        
        $scope.$watch('addProjectForm', function(newVal, oldVal) {
          if (newVal) {
            onFormLoaded();
          }
        }); 
        
        $scope.$watch('updateProjectForm', function(newVal, oldVal){
          if (newVal){
            updateFormLoaded();   
          } 
        });
        
        $scope.uploadFile = function(){
            file = event.target.files[0];
            $scope.project.upload = file;
            $scope.$apply();
        };
        
        $scope.goToState = function(id){
            window.location.href=  "/project/" + id;
        };
        
        $scope.updateFile = function(){
            file = event.target.files[0];
            $scope.update.upload = file;
            $scope.$apply();
        };
        
        $scope.deleteProject = function(id){
            projectService.deleteProject($scope.projects, $scope.userid, id)
                .then(function(project) {
            });
        };       
        
        $scope.getProject = function(id){
            for(var i = 0; i < $scope.projects.length; i++){
                if(id === $scope.projects[i].id){
                    $scope.update.id = id;
                    $scope.update = $scope.projects[i];
                    $scope.update.name = $scope.projects[i].name;
                    $scope.update.com_name = $scope.projects[i].company_name;
                    $scope.update.marker_type = $scope.projects[i].marker_type;
                    $scope.update.upload = $scope.projects[i].upload;
                }
            }
            $("#welcome_page").hide();
            $("#create_project").hide();
            $("#update_page").show();
       
        };
        
        $scope.updateProject = function(id){
            $("#update_page").hide();
            $("#welcome_page").show();
            projectService.updateProject($scope.projects, $scope.update, $scope.update.upload, $scope.userid,id)
            .then(function(update){
                $scope.project = update;
            });
        };
        
        $scope.addProject = function(){
            $("#welcome_page").show();
            projectService.addProject($scope.project, $scope.project.upload, $scope.userid)
                .then(function(project) {
                $scope.projects.push(project);
                $scope.reset();
            }).catch(function(res){
                console.log(res); //handle error message
            });
        };
        
        $scope.reset = function(){
            $("#upload_file").val("");
            $scope.empty.image_url = $scope.project.image_url;
            $scope.project = angular.copy($scope.empty); 
      
        };
        
        $http({
            method: 'GET',
            url : '/api/users/' + $scope.userid + '/projects'
        }).success(function(res){
            $scope.projects = res.data;
        });
    });
 })();   
