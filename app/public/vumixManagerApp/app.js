(function() {
  angular
    .module('vumixManagerApp', [
      'vumixManagerApp.controllers',  
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/manager');
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
        });
    }]);  
})();