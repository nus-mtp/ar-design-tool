(function() {
  angular.module('vumixManagerApp.services')
    .factory('modelService', function($http) {
     return{
       
       addModel: function(model, upload_model, userId){
            var fd = new FormData();
            var uploadUrl = '/api/users/' + userId + '/models';
            fd.append('file', upload_model);
            fd.append('uid', userId);
            fd.append('model_name', model.model_name);
            fd.append('file_size',model.file_size);
            fd.append('file_extension', model.file_extension);
    
            return $http.post(uploadUrl, fd, {
                headers: {'Content-Type': undefined}
            })
            .then(function(res){
                return res.data.data[0];
            }, function errorCallback(res){
               console.log("error adding the model");
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
              
       updateModel: function(models, update, update_file , userId, id){
           var fd = new FormData();
           var uploadUrl = '/api/users/' + userId + '/models/ '+ id;
           fd.append('file', update_file);
           fd.append('uid', userId);
           fd.append('model_name', update.name);
           fd.append('file_size', update.file_size);
           fd.append('file_extension', update.file_extension);
           
           return $http({
               method: 'PUT',
               url: '/api/users/' + userId + '/models/' + id      
           }).then(function(res){
               for(var i = 0; i < models.length; i++){
                   if(id === models[i].id){
                       models[i] = update;
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