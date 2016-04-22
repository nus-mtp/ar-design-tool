describe("vumixManagerApp.controllers", function() {
  
  beforeEach(module('vumixManagerApp'));
  
  describe("imageController", function() {
    
    var model;
    var $scope = {};
    
    beforeEach(inject(function($controller) {
      model = $controller('imageController', { $scope: $scope });
    }));
    
    it("should contain imageService method", function() {
      expect($scope.imageService).toBeDefined();
    });
  
  });
  
  describe("managerController", function() {
    
    var model;
    var $scope = {};
    
    beforeEach(inject(function($controller) {
      model = $controller('managerController', { $scope: $scope });
    }));
    
    it("should contain projectService method", function() {
      expect($scope.projectService).toBeDefined();
    });
  
  });
  
  describe("modelController", function() {
    
    var model;
    var $scope = {};
    
    beforeEach(inject(function($controller) {
      model = $controller('modelController', { $scope: $scope });
    }));
    
    it("should contain modelService method", function() {
      expect($scope.modelService).toBeDefined();
    });
  
  });

});