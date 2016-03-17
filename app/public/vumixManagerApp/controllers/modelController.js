// Handle model
angular.module('vumixManagerApp.controllers')
    .controller('modelController', function (modelService, $http, $scope) {
        var filename;
     
        $scope.models = [];
        $scope.model = {
            model_name: "",
            file_size: "",
            file_extension: "",
            upload: undefined
        };
        
        $scope.userid = 6;
        
        $scope.uploadFile = function(){
            filename = event.target.files[0].name;
            $scope.model.upload = filename;
        };
        
        $scope.getModel = function(id){
          modelService.getModel($scope.models, $scope.userid,id)
            .then(function(model){
                $scope.model = model;
            });
        };
        
        $scope.updateModel = function(id){
            modelService.updateModel($scope.models,$scope.model, $scope.userid,id)
            .then(function(model){
                $scope.model = model;
            });
        };
        
        $scope.deleteModel = function(id){
            modelService.deleteModel($scope.models, $scope.userid, id)
                .then(function(model) {
                //  console.log($scope.models);
            });
        };       
        
        $scope.addModel = function(){
           modelService.addModel($scope.model, $scope.model.upload, $scope.userid)
                .then(function(model) {
                console.log(model);
                $scope.models.push(model);
            });
        };
        
        $http({
            method: 'GET',
            url : '/api/users/6/models'
        }).success(function(res){
            $scope.models = res.data;
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
