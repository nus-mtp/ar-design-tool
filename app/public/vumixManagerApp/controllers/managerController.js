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
        
        $scope.uploadFile = function(){
            filename = event.target.files[0].name;
            $scope.project.upload = filename;
        };
        
        $scope.deleteProject = function(id){
            projectService.deleteProject($scope.projects, $scope.userid, id)
                .then(function(project) {
                    //$scope.projects.push(project);
                    console.log($scope.projects);
            });
        };       
        
        $scope.addProject = function(){
            projectService.addProject($scope.project.company_name, $scope.project.project_name, $scope.project.marker_type, $scope.project.upload, $scope.userid)
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
