(function() {
  angular.module('vumixManagerApp.controllers')
    .controller('projectController', function ($scope, $http) {
        $http.get('http://localhost:3000/api/users/1/projects').
            success(function(response){
               $scope.listProjects = response.data; 
               console.log($scope.listProjects);
            });
        $scope.createProject = function(){
            console.log("i've clicked")
            console.log($scope.project);
        };
    })
})();

