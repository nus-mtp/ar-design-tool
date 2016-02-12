describe("vumixEditorApp.services", function() {
  
  beforeEach(module('vumixEditorApp'));
  
  describe("unityMapperService", function() {
    
    var mockService;
    
    beforeEach(inject(function(unityMapper) {
      mockService = unityMapper;
    }));
    
    it("setTransformMode, will call SendMessage with appropriate arguments", function() {
      window.SendMessage = function(gameObject, method, args){};
      spyOn(window, 'SendMessage');
      mockService.setTransformMode("translate");
      expect(window.SendMessage).toHaveBeenCalledWith("EditorPlayer", "SetTransformMode", "translate");
    });
  
  });

});