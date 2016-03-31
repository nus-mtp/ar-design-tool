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
<<<<<<< HEAD
            
            return $http.post(uploadUrl, fd, {
                headers: {'Content-Type': undefined}
            })
            .then(function(res){
                $("#floatingCirclesG").show().delay(13000).fadeOut();
                $(".navbar").css( "zIndex" , -10 );

=======
            $http.post("/api/users/" + userid + "/projects", fd, {
                headers: {'Content-Type': undefined}
            })
            .success(function(res){
>>>>>>> parent of 607ee49... Merge branch 'scss' into mich
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
<<<<<<< HEAD

        updateProject: function(projects, update, update_file, userId, id){
           var fd = new FormData();
           var uploadUrl = '/api/users/' + userId + '/projects/' + id ;
           fd.append('file', update_file);
           fd.append('uid', userId);
           fd.append('name', update.name);
           fd.append('company_name',update.com_name);
           fd.append('marker_type',update.marker_type);
           return $http.put(uploadUrl, fd, {
               headers: {'Content-Type': undefined}
=======
        
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
>>>>>>> parent of 607ee49... Merge branch 'scss' into mich
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
