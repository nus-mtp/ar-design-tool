angular.module('vumixManagerApp.controllers')
    .controller('managerController', function (projectService, $http, $scope) {
        var filename;

        $scope.projects = [];
        $scope.project = {
            project_name: "",
            company_name: "",
            marker_type: "",
            upload: undefined
        };
        
        $scope.userid = 1;
        console.log($scope.userid);
        
        $scope.uploadFile = function(){
            filename = event.target.files[0];
            $scope.project.upload = filename;
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
                    $scope.project = $scope.projects[i];
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
            url : '/api/users/1/projects'
        }).success(function(res){
            $scope.projects = res.data;
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
