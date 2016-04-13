(function() {
  angular.module('vumixManagerApp.services')
    .factory('projectService', function($http, loaderService) {
     return{

       addProject: function(project, upload_project, userId){
            var fd = new FormData();
            var uploadUrl = '/api/users/' + userId + '/projects';
            fd.append('file', upload_project);
            fd.append('uid', userId);
            fd.append('name', project.project_name);
            fd.append('company_name',project.company_name);
            fd.append('marker_type', project.marker_type);
            loaderService.showLoader("Building the Project");
            return $http.post(uploadUrl, fd, {
                headers: {'Content-Type': undefined}
            })
            .then(function(res){
                loaderService.hideLoader(); 
                return res.data.data[0];
            }, function errorCallback(res){
                loaderService.hideLoader();              
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
           }).then(function(res){
               for(var i = 0; i < projects.length; i++){
                   if(id === projects[i].id){
                       projects[i] = update;
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
