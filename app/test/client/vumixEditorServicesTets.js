describe("vumixEditorApp.services", function() {
  
  beforeEach(module('vumixEditorApp'));
  
  describe("unityMapperService", function() {
    
    var mockService;
    
    beforeEach(inject(function(unityMapper) {
      mockService = unityMapper;
    }));
    
    it("calls setTransformMode and call SendMessage with appropriate arguments", function() {
      window.SendMessage = function(gameObject, method, args){};
      spyOn(window, 'SendMessage');
      mockService.setTransformMode("translate");
      expect(window.SendMessage).toHaveBeenCalledWith("Control Scripts", "SetTransformMode", "translate");
    });
  
  });

});