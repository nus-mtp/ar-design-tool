(function() {
  angular
    .module('vumixManagerApp', [
      'vumixManagerApp.controllers',
      'vumixManagerApp.services',
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/manager');  //TODO: Doesn't allow user to re-route
      $stateProvider
        .state('manager', {
          url: '/manager',
          templateUrl: '/vumixManagerApp/partials/manager.html',
          controller: 'managerController'
        })
        .state('model', {
          url: '/model',
          templateUrl: '/vumixManagerApp/partials/model.html',
          controller: 'modelController'
        })
        .state('image',{
          url: '/image',
          templateUrl: '/vumixManagerApp/partials/image.html',
          controller: 'imageController'
        })
    }]);  
})(); 