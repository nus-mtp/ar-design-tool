(function() {
  angular.module('vumixManagerApp.services')
    .factory('projectService', function($http) {
     return{
       
    //    addProject: function(project, upload_project, userId){
    //        return $http({
    //           method: 'POST',
    //           url: '/api/users/' + userId + '/projects',
    //           data: {
    //             name: project.project_name,
    //             company_name: project.company_name,
    //             marker_type: project.marker_type,
    //             upload_project: upload_project
    //           },
    //        }).then (function (res){
    //            return res.data.data[0];
    //        }, function errorCallback(res){
    //            console.log("error");
    //        });  
    //    },
  
       // TO DO: To upload vuforia package
       addProject: function(project, upload_project, userId){
            var fd = new FormData();
            var uploadUrl = '/api/users/' + userId + '/projects';
            fd.append('file', upload_project);
            fd.append('uid', userId);
            fd.append('name', project.project_name);
            fd.append('company_name',project.company_name);
            fd.append('marker_type', project.marker_type);

            return $http.post(uploadUrl, fd, {
                headers: {'Content-Type': undefined}
            })
            .then(function(res){
                return res.data.data[0];
            }, function errorCallback(res){
               console.log("error adding the project");
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
