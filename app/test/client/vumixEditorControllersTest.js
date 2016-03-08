describe("vumixEditorApp.controllers", function() {
  
  beforeEach(module('vumixEditorApp'));
  
  describe("editorController", function() {
    
    var viewmodel;
    var $scope = {};
    
    beforeEach(inject(function($controller) {
      viewmodel = $controller('editorController', { $scope: $scope });
    }));
    
    it("should contain setTransformMode method", function() {
      expect($scope.setTransformMode).toBeDefined();
    });
  
  });
  
  describe("managerController", function() {
    
    var viewmodel;
    var $scope = {};
    
    beforeEach(inject(function($controller) {
      viewmodel = $controller('managerController', { $scope: $scope });
    }));
    
    it("should contain editorService method", function() {
      expect($scope.editorService).toBeDefined();
    });
  
  });

});