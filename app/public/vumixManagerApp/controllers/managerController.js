angular.module('vumixManagerApp.controllers')
    .controller('managerController', function (projectService, $http, $scope, $timeout) {
        var file;

        $scope.projects = [];
        $scope.project = {
            project_name: "",
            company_name: "",
            marker_type: "3D",
            image_url: "",
            upload: undefined
        };
        
        $scope.update = {
            project_name: "",
            company_name: "",
            marker_type: "3D",
            upload: undefined
        };
                  
        var cookie = document.cookie.split(';')[2];
        $scope.userid = cookie.substring(5);
        $scope.project.image_url = "/resources/images/open_book.png";

        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return $scope.project.upload;
          }
          
          var extensionCheck = function() {
            var tokenised = $scope.project.upload.name.split('.');
            if (tokenised.length < 1) {
              return false;
            }
            return tokenised[tokenised.length - 1] === 'unitypackage';
          }
          
          $scope.$watch('project.upload', function(newVal, oldVal) {   
            $scope.addProjectForm.projectUpload.$setValidity('required', false); 
            $scope.addProjectForm.projectUpload.$setValidity('fileType', false); 
            if (requiredCheck()) {      
              $scope.addProjectForm.projectUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.addProjectForm.projectUpload.$setValidity('fileType', true); 
              }                            
            }
          });
        };
        
        $scope.$watch('addProjectForm', function(newVal, oldVal) {
          if (newVal) {
            onFormLoaded();
          }
        });        
        
        $scope.uploadFile = function(){
            file = event.target.files[0];
            $scope.project.upload = file;
            $scope.$apply();
        };
        
        $scope.deleteProject = function(id){
            projectService.deleteProject($scope.projects, $scope.userid, id)
                .then(function(project) {
                    //$scope.projects.push(project);
                    // console.log($scope.projects);
            });
        };       
        
        $scope.getProject = function(id){
            for(var i = 0; i < $scope.projects.length; i++){
                if(id === $scope.projects[i].id){
                    $scope.update = $scope.projects[i];
                }
            }
        };
        
        $scope.updateProject = function(id){
            projectService.updateProject($scope.projects,$scope.project, $scope.userid,id)
            .then(function(project){
                $scope.project = project;
            });
        };
        
        $scope.addProject = function(){
            projectService.addProject($scope.project, $scope.project.upload, $scope.userid)
                .then(function(project) {
                $scope.projects.push(project);
            });
        };
        
        $http({
            method: 'GET',
            url : '/api/users/' + $scope.userid + '/projects'
        }).success(function(res){
            $scope.projects = res.data;
        });
    });
