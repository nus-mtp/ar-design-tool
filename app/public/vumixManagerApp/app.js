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
          views: {
            "manager": {
              templateUrl: '/vumixManagerApp/partials/manager.html',
              controller: 'managerController'
            }
          }
        });
    }]);  
})();