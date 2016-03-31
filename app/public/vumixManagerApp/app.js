(function() {
  angular
    .module('vumixManagerApp', [
      'vumixManagerApp.controllers',
      'vumixManagerApp.services',
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
<<<<<<< HEAD
      $urlRouterProvider.otherwise('/');  //TODO: Doesn't allow user to re-route
=======
      $urlRouterProvider.otherwise('/manager'); 
>>>>>>> scss
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
    }]);  
})(); 