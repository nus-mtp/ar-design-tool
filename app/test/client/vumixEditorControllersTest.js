describe("vumixEditorApp.controllers", function() {
  
  beforeEach(module('vumixEditorApp'));
  
  describe("editorController", function() {
    
    var viewmodel;
    
    beforeEach(inject(function($controller) {
      viewmodel = $controller('editorController');
    }));
    
    it("should contain setTransformMode method", function() {
      expect(viewmodel.setTransformMode).toBeDefined();
    });
  
  });

});