(function() {
  angular.module('vumixManagerApp.services')
    .factory('projectService', function($http) {
     return{
       
       addProject: function(company_name, project_name, marker_type, upload_project, userId){
           return $http({
              method: 'POST',
              url: '/api/users/' + userId + '/projects',
              data: {
                name: project_name,
                company_name: company_name,
                marker_type: marker_type
              },
           }).then (function (res){
               return res.data.data[0];
           }, function errorCallback(res){
               console.log("error");
           });  
       },
       
       // TO DO: To upload vuforia package
       fileUpload: function(file, uploadURL, project, userId){
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                data: {
                    name: project_name,
                    company_name: company_name,
                    marker_type: marker_type
                },
            })
            .success(function(res){
                return res.data.data[0];
            })
            .error(function(){
                console.log("error");
            });
       },
       
       deleteProject: function(projects, userId, id){
           return $http({
               method: 'DELETE',
               url: '/api/users/' + userId + '/projects/' + id      
           }).then(function(res){
               for(var i = 0; i < projects.length; i++){
                   if(id === projects[i].id){
                       projects.splice(i, 1);
                   }
               }
               return projects;
           }, function errorCallback(res){
               console.log("error deleting the model");
           });
        },  
        
        getProject: function(projects, userId, id){
           return $http({
               method: 'GET',
               url: '/api/users/' + userId + '/projects/' + id      
           }).then(function(res){
               for(var i = 0; i < projects.length; i++){
                   if(id === projects[i].id){
                       return projects[i];
                   }
               }
           }, function errorCallback(res){
               console.log("error getting the model");
           }); 
        },
        
        updateProject: function(projects, project, userId, id){
           return $http({
               method: 'PUT',
               url: '/api/users/' + userId + '/projects/' + id      
           }).then(function(res){
               for(var i = 0; i < projects.length; i++){
                   if(id === projects[i].id){
                       projects[i] = project;
                       return projects[i];
                   }
               }
           }, function errorCallback(res){
               console.log("error getting the model");
           }); 
        },
         
      };
    }); 
})();
