(function() {
  angular
    .module('vumixEditorApp', [
      'vumixEditorApp.controllers', 
      'vumixEditorApp.directives', 
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/state/editor');
      $stateProvider
        .state('stateManager', {
          url: '/state',
          templateUrl: '/vumixEditorApp/partials/stateManager.html',
          controller: 'managerController'
        })
        .state('stateManager.editor', {
          url: '/editor',
          templateUrl: '/vumixEditorApp/partials/stateEditor.html',
          controller: 'editorController'
        });
    }]);  
})();