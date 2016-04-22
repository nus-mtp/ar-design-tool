describe("vumixManagerApp.services", function() {
  
  beforeEach(module('vumixManagerApp'));
  
  describe("projectService", function() {
    
    var mockService;
    
    beforeEach(inject(function(projectService) {
      mockService = projectService;
    }));
  
  });

  describe("imageService", function() {
    
    var mockService;
    
    beforeEach(inject(function(imageService) {
      mockService = imageService;
    }));
    
  
  });
  
  describe("modelService", function() {
    
    var mockService;
    
    beforeEach(inject(function(modelService) {
      mockService = modelService;
    }));
    
  });
  
});