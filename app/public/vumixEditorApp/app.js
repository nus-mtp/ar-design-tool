(function() {
  angular
    .module('vumixEditorApp', [
      'vumixEditorApp.controllers',  
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/manager');
      $stateProvider
        .state('statemanager', {
          url: '/stateManager',
          views:{
              '':{
                  templateUrl: '/vumixEditorApp/partials/stateManager.html',
                  controller: 'managerController',
                  controllerAs: 'viewmodel'
              }
          }
      });
    }]);  
})();