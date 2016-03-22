(function() {
  angular.module('vumixEditorApp.services')
    .factory('stateModelService', function() {      
      var service = {};
      
      service.counter = 0;
      
      service.stateModel = {}
      service.stateModel.models = [];
      service.stateModel.states = [];
      
      // NOT SAFE TO CALL
      // add model to existing class, given name
      // id is auto generated, called by Unity
      service.addModel = function(name) {
        var _model = {
          id: this.counter++,
          name: name,
          clickable: false          
        };
        this.stateModel.models.push(_model);
      }
      
      // get all models available
      service.getAllModels = function() {
        return this.stateModel.models;
      }
      
      return service;
    });
})();