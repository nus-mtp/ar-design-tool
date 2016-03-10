(function() {
  angular
    .module('vumixEditorApp', [
      'vumixEditorApp.controllers',  
      'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/manager/editor');
      $stateProvider
        .state('stateManager', {
          url: '/manager',
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