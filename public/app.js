(function() {
  "use strict;"
  angular
    .module('ardesignApp', [
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/public/views/partials/home.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/public/views/partials/login'
        })
    }]);  
})();