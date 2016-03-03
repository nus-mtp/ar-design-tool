(function() {
  "use strict";
  angular
    .module('ardesignApp', [
      'ardesignApp.controllers',  
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/error');
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/public/views/partials/home.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/public/views/partials/login'
        })
        .state('editor', {
          url: '/editor',
          views: {
            '': {
              templateUrl: '/public/views/partials/editor.html',
              controller: 'editorController',
              controllerAs: 'viewmodel'
            }
          }
        })
        .state('error', {
          url: '/error',
          templateUrl: '/public/views/partials/error.html'
        });
    }]);  
})();