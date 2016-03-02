(function() {
  angular.module('vumixManagerApp.controllers')
    .controller('managerController', function ($scope, $http) {
        $http.get('http://localhost:3000/api/users/1/models').
            success(function(data){
               $scope.listModels = data; 
               console.log($scope.listModels);
            });
    }); 
})();
