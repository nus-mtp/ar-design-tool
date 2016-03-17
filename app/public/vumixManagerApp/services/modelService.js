(function() {
  angular.module('vumixManagerApp.services')
    .factory('modelService', function($http) {
     return{
       
       addModel: function(model_name,file_size, file_extension, file_upload, userId){
           return $http({
              method: 'POST',
              url: '/api/users/' + userId + '/models',
              data: {
                  name : model_name,
                  file_size : file_size,
                  file_extension : file_extension
              }
           }).then(function(res){
               return res.data.data[0];
           }, function errorCallback(res){
               console.log("error uploading file")
           });  
       }, 
       
       getModel: function(models, userId, id){
           return $http({
               method: 'GET',
               url: '/api/users/' + userId + '/models/' + id      
           }).then(function(res){
               for(var i = 0; i < models.length; i++){
                   if(id === models[i].id){
                       return models[i];
                   }
               }
           }, function errorCallback(res){
               console.log("error getting the model");
           }); 
       },     
       
       deleteModel: function(models, userId, id){
           return $http({
               method: 'DELETE',
               url: '/api/users/' + userId + '/models/' + id 
           }).then(function(res){
               for(var i =0; i < models.length; i++){
                   if(id === models[i].id){
                       models.splice(i,1);
                   }
               }
               return models;
           }, function errorCallback(res){
               console.log("error deleting model");
           });
       },
       
       updateModel: function(models, model, userId, id){
           return $http({
               method: 'PUT',
               url: '/api/users/' + userId + '/models/' + id      
           }).then(function(res){
               for(var i = 0; i < models.length; i++){
                   if(id === models[i].id){
                       models[i] = model;
                       return models[i];
                   }
               }
           }, function errorCallback(res){
               console.log("error getting the model");
           }); 
        },

     };
    }); 
})();