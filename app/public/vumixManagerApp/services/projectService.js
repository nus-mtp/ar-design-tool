(function() {
  angular.module('vumixManagerApp.services')
    .factory('projectService', function($http) {
     return{
       
       // TO DO: To upload vuforia package
       addProject: function(project, userid){
            var fd = new FormData();
            fd.append('file', project.upload);
            fd.append('uid', userid);
            fd.append('name', project.project_name);
            fd.append('company_name', project.company_name);
            fd.append('marker_type', project.marker_type);
            $http.post("/api/users/" + userid + "/projects", fd, {
                headers: {'Content-Type': undefined}
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
