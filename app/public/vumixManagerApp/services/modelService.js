(function() {
  angular.module('vumixManagerApp.services')
    .factory('modelService', function($http) {
     return{
<<<<<<< HEAD
             
       addModel: function(models,model_name, userId, file_size, file_extension, file_location){
=======
       
       addModel: function(model_name,file_size, file_extension, file_upload, userId){
>>>>>>> scss
           return $http({
              method: 'POST',
              url: '/api/users/' + userId + '/models',
              data: {
<<<<<<< HEAD
                  model_name : model_name,
                  file_size : file_size,
                  file_extension : file_extension,
                  file_location : file_location
              }
           }).then(function(res){
               models.push(res.data.response[0]);
               return models;
           });  
       },
=======
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
>>>>>>> scss
       
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
<<<<<<< HEAD
           });
       },
       
    //    editModel: function(project_name, company_name, marker_type){
    //        return $http({
    //            method: '',
    //            url: ''
               
    //        }).then(function(res){
               
    //        });
    //    },
       
    //    showAllModel: function(projects, userId){
    //        return $http({
    //            method: 'GET',
    //            url: '/api/users/' + userId + '/models'
    //        }).then (function(res){
    //            console.log("Show all models" + res);
    //        });
    //    }
         
=======
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
>>>>>>> scss
     };
    }); 
})();