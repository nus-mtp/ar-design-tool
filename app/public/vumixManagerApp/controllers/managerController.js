(function() {
  angular.module('vumixManagerApp.controllers')
    .controller('managerController', function ($scope, $http) {
        $http.get('http://localhost:3000/api/users/1/projects').
            success(function(response){
               $scope.listProjects = response.data; 
               console.log($scope.listProjects);
            });
    })
    .controller('modelController', function ($scope, $http){
        $http.get('http://localhost:3000/api/users/1/models').
            success(function(response){
               $scope.listModels = response.data; 
               console.log($scope.listModels);
            });
    });
})();
