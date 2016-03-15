angular.module('vumixManagerApp.controllers')
    .controller('managerController', function (modelService, projectService, $http, $scope) {
        var filename;
        
        console.log("coming to maanager");
        $scope.projects = [];
        $scope.project = {
            project_name: "",
            company_name: "",
            marker_type: "",
            upload: undefined
        };
        
        $scope.userid = 1;
        
        $scope.uploadFile = function(){
            filename = event.target.files[0].name;
            $scope.project.upload = filename;
        };
        
        $scope.addProject = function(){
            projectService.addProject($scope.project.company_name, $scope.project.project_name, $scope.project.marker_type, $scope.project.upload, $scope.userid)
                .then(function(project) {
                $scope.projects.push(project);
            });
        }
        $http({
            method: 'GET',
            url : '/api/users/1/projects'
        }).success(function(res){
            $scope.projects = res.data;
            console.log($scope.projects);
        });
    //})
    //.controller('modelController', function (modelService, $http){
        //console.log("coming to model");
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
