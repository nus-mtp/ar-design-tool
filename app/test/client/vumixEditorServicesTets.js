describe("vumixEditorApp.services", function() {
  
  beforeEach(module('vumixEditorApp'));
  
  describe("unityMapperService", function() {
    
    var mockService;
    
    beforeEach(inject(function(unityMapperService) {
      mockService = unityMapperService;
    }));
    
    it("calls setTransformMode and call SendMessage with appropriate arguments", function() {
      window.SendMessage = function(gameObject, method, args){};
      spyOn(window, 'SendMessage');
      mockService.setTransformMode("translate");
      expect(window.SendMessage).toHaveBeenCalledWith("Control Scripts", "SetTransformMode", "translate");
    });
  
  });

  describe("editorService", function() {
    
    var mockService;
    
    beforeEach(inject(function(editorService) {
      mockService = editorService;
    }));
    
    it("should initialise open with false value", function() {
      expect(mockService.open).toBe(false);
    });
  
    it("should change toggle the open value when openEditor and closeEditor are called alternatively", function() {
      mockService.openEditor();
      expect(mockService.open).toBe(true);
      mockService.closeEditor();
      expect(mockService.open).toBe(false);
    });
    
  });
  
});