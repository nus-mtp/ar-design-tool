// angular.module('vumixManagerApp.services', ['ngResource'])
// .factory('projectService', function($resource) {
//      return $resource('http://localhost:3000/api/users//projects', {id: '@userId'}, {
//          "update":{
//              method: 'PUT'
//          }
//      });
     
// }); 
(function() {
  angular.module('vumixManagerApp.services')
    .factory('projectService', function($http) {
     return{
       
       addProject: function(projects, company_name, project_name, marker_type, upload_project, userId){
           console.log("adding project");
           return $http({
              method: 'POST',
              url: '/api/users/' + userId + '/projects',
              data: {
                uid: userId,
                name: project_name,
                company_name: company_name,
                marker_type: marker_type,
                project_dat_file: upload_project,
                assetbundle_id: 1            
              }
           }).then(function(res){
               projects.push(res.data.response[0]);
               return projects;
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
           });
       },
      
       
       showAllProject: function(projects, userId){
           return $http({
               method: 'GET',
               url: '/api/users/' + userId + '/projects'
           }).then (function(res){
               console.log("Show all project" + res);
           });
       },
         
     };
    }); 
})();
