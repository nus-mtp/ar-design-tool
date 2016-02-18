(function() {
  angular
    .module('vumixEditorApp', [
      'vumixEditorApp.controllers',  
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/editor');
      $stateProvider
        .state('editor', {
          url: '/editor',
          views: {
            '': {
              templateUrl: '/vumixEditorApp/partials/editor.html',
              controller: 'editorController',
              controllerAs: 'viewmodel'
            }
          }
        })    
        .state('statemanager', {
          url: '/manager',
          views:{
              '':{
                  templateUrl: 'vumixEditorApp/partials/statemanager.html'
              }
          }
      });
    }]);  
})();