(function() {
  angular
    .module('vumixEditorApp', [
      'vumixEditorApp.controllers', 
      'vumixEditorApp.directives', 
      'ui.router',
      'ngVis'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/state');
      $stateProvider
        .state('stateManager', {
          url: '/state',
          views: {
            "": {
              templateUrl: '/vumixEditorApp/partials/stateManager.html',     
              controller: 'managerController'     
            },
            "defaultSidebar@stateManager": {
              templateUrl: '/vumixEditorApp/partials/stateManager.defaultSidebar.html',   
              controller: 'managerSidebarController'           
            },
            "editor@stateManager": {
              templateUrl: '/vumixEditorApp/partials/stateManager.editor.html',
              controller: 'editorController'
            }
          }
        });
    }]);  
})();