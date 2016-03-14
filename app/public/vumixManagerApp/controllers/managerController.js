(function() {
  angular.module('vumixManagerApp.controllers')
    .controller('managerController', function (projectService, $http, $scope) {
        console.log("coming to maanager");
        // $http.get('http://localhost:3000/api/users/1/projects').
        //     success(function(response){
        //        $scope.listProjects = response.data; 
        //        console.log($scope.listProjects);
        //     });
        //project
        $scope.projects = [];
        $scope.project = {
            project_name: "",
            company_name: "",
            marker_type: "",
            upload: undefined
        };
        
        $scope.userid = 1;

        $scope.addProject = function(){
            projectService.addProject($scope.projects, $scope.project.company_name, $scope.project.project_name, $scope.project.marker_type, $scope.project.upload, $scope.userid)
                .then(function(projects) {
                $scope.projects = projects;
                console.log($scope.projects);
            });
            console.log("I am adding a project");
            console.log("company_name" + $scope.project.company_name);
            console.log("company_name" + $scope.project.marker_type);
            // projectService.addProject(viewproject.company_name, viewproject.project_name, viewproject.marker_type).then(function(projects) {
            //     console.log("i am clicked");
            //     viewproject.projects = projects;
            // });
        }
        $http({
            method: 'GET',
            url : '/api/users/1/projects'
        }).success(function(res){
           $scope.projects = res.data;
           console.log( $scope.projects);
        });
    })
    .controller('modelController', function (modelService, $http){
        console.log("coming to model");
        // $http.get('http://localhost:3000/api/users/1/models').
        //     success(function(response){
        //        $scope.listModels = response.data; 
        //        console.log($scope.listModels);
        //     });
        var viewmodel = this;
        viewmodel.models = [];
        viewmodel.model_name = "";
        viewmodel.file_size = "";
        viewmodel.file_extension = "";
        viewmodel.file_location = "";
        
        viewmodel.addModel = function(){
            console.log("i am adding a model");
            modelService.addModel(viewmodel.model_name, viewmodel.file_size, viewmodel.file_extension, viewmodel.file_location).then(function(models){
                viewmodel.models = models;
            });
        }
        $http({
            method: 'GET',
            url : '/api/users/1/models'
        }).then(function(res){
            viewmodel.models = res.data.response;
        })
    });
})();
