(function() {
  angular.module('vumixManagerApp.services')
    .factory('modelService', function($http) {
     return{
             
       addModel: function(models,model_name, userId, file_size, file_extension, file_location){
           return $http({
              method: 'POST',
              url: '/api/users/' + userId + '/models',
              data: {
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
           });
       },
       
    //    editModel: function(project_name, company_name, marker_type){
    //        return $http({
    //            method: '',
    //            url: ''
               
    //        }).then(function(res){
               
    //        });
    //    },
       
       showAllModel: function(projects, userId){
           return $http({
               method: 'GET',
               url: '/api/users/' + userId + '/models'
           }).then (function(res){
               console.log("Show all models" + res);
           });
       }
         
     };
    }); 
})();