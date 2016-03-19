angular.module('vumixManagerApp.controllers')
    .controller('managerController', function (projectService, $http, $scope, $timeout) {
        var filename;

        $scope.projects = [];
        $scope.project = {
            project_name: "",
            company_name: "",
            marker_type: "3D",
            upload: undefined
        };
        
        /*
        $scope.$watch('newProjectForm', function(newVal, oldVal) {
          if (newVal) {
            $scope.newProjectForm.projectUpload.$setValidity('required', false);
          }
        });
        */
        
        $scope.$watch('project.upload', function(newVal, oldVal) {   
          if ($scope.project.upload) {      
            
          }
        });
        
        $scope.uploadFile = function(){
            filename = event.target.files[0].name;
            $scope.project.upload = filename;
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
          projectService.getProject($scope.projects, $scope.userid,id)
            .then(function(project){
                $scope.project = project;
            });
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
                console.log($scope.project.upload);
                $scope.projects.push(project);
            });
        };
        
        $http({
            method: 'GET',
            url : '/api/users/1/projects'
        }).success(function(res){
            $scope.projects = res.data;
        });
    });
