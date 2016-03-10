(function() {
  angular.module('vumixManagerApp.controllers')
    .controller('modelSenderController', function ($scope, $http) {
    })
    .controller('modelController', function ($scope, $http){
        $http.get('http://localhost:3000/api/users/1/models').
            success(function(response){
               $scope.listModels = response.data; 
               console.log($scope.listModels);
            });
    });
})();
