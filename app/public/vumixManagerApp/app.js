(function() {
  angular
    .module('vumixManagerApp', [
      'vumixManagerApp.controllers',
      'vumixManagerApp.services',
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
<<<<<<< HEAD
      $urlRouterProvider.otherwise('/manager'); 
=======
      $urlRouterProvider.otherwise('/');  //TODO: Doesn't allow user to re-route
>>>>>>> parent of 607ee49... Merge branch 'scss' into mich
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