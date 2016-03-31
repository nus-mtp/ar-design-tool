angular.module('vumixManagerApp.controllers')
<<<<<<< HEAD
    .controller('managerController', function (projectService, $http, $scope) {
        var filename;

=======
    .controller('managerController', function (projectService, $http, $scope, $timeout, $window) {
        var file;
        
        $scope.empty = {
            project_name: "",
            company_name: "",
            marker_type: "3D",
            image_url: "",  
            upload: undefined
        };
        
>>>>>>> scss
        $scope.projects = [];
       
        $scope.project = {
            project_name: "",
            company_name: "",
<<<<<<< HEAD
            marker_type: "",
            upload: undefined
        };
        
        $scope.userid = 1;
        
        $scope.uploadFile = function(){
            filename = event.target.files[0].name;
            $scope.project.upload = filename;
=======
            marker_type: "3D",
            image_url: "",  
            upload: undefined
        };
        
        $scope.update = {
            id: "",
            name: "",
            com_name: "",
            marker_type: "3D",
            image_url: "",    
            upload: undefined
        };
                  

        var cookie = document.cookie.split(';')[0];
        var uid = cookie.split('=');
        $scope.userid = uid[1];
        $scope.project.image_url = "/resources/images/open_book.png";
        $scope.update.image_url = "/resources/images/open_book.png";
        
        var onFormLoaded = function() {          
          var requiredCheck = function() {
            return $scope.project.upload;
          };
          
          var extensionCheck = function() {
            var tokenised = $scope.project.upload.name.split('.');
            if (tokenised.length < 1) {
              return false;
            }
            return tokenised[tokenised.length - 1] === 'unitypackage';
          };
          
          $scope.$watch('project.upload', function(newVal, oldVal) {   
            $scope.addProjectForm.projectUpload.$setValidity('required', false); 
            $scope.addProjectForm.projectUpload.$setValidity('fileType', false); 
            if (requiredCheck()) {      
              $scope.addProjectForm.projectUpload.$setValidity('required', true);
              if (extensionCheck()) {
                $scope.addProjectForm.projectUpload.$setValidity('fileType', true); 
              }                            
            }
          });
        };
        
        $scope.$watch('addProjectForm', function(newVal, oldVal) {
          if (newVal) {
            onFormLoaded();
          }
        });        
        
        $scope.uploadFile = function(){
            file = event.target.files[0];
            $scope.project.upload = file;
            $scope.$apply();
>>>>>>> scss
        };
        
        $scope.goToState = function(id){
            window.location.href=  "/project/" + id;
        }
        
        $scope.updateFile = function(){
            file = event.target.files[0];
            $scope.update.upload = file;
            $scope.$apply();
        }
        
        $scope.deleteProject = function(id){
            projectService.deleteProject($scope.projects, $scope.userid, id)
                .then(function(project) {
            });
        };       
        
        $scope.getProject = function(id){
<<<<<<< HEAD
          projectService.getProject($scope.projects, $scope.userid,id)
            .then(function(project){
                $scope.project = project;
            });
        };
        
        $scope.updateProject = function(id){
            projectService.updateProject($scope.projects,$scope.project, $scope.userid,id)
            .then(function(project){
                $scope.project = project;
=======
            for(var i = 0; i < $scope.projects.length; i++){
                if(id === $scope.projects[i].id){
                    $scope.update.id = id;
                    $scope.update = $scope.projects[i];
                    $scope.update.name = $scope.projects[i].name;
                    $scope.update.com_name = $scope.projects[i].company_name;
                    $scope.update.marker_type = $scope.projects[i].marker_type;
                    $scope.update.upload = $scope.projects[i].upload;
                }
            }
        };
        
        $scope.updateProject = function(id){
            projectService.updateProject($scope.projects, $scope.update, $scope.update.upload, $scope.userid,id)
            .then(function(update){
                $scope.project = update;
>>>>>>> scss
            });
        };
        
        $scope.addProject = function(){
            projectService.addProject($scope.project, $scope.userid)
                .then(function(project) {
                $(".navbar").css( "zIndex" , 0 );
                $scope.projects.push(project);
                $scope.reset();
            });
        };
        
        $scope.reset = function(){
            $("#upload_file").val("");
            $scope.empty.image_url = $scope.project.image_url;
            $scope.project = angular.copy($scope.empty); 
      
        };
        
        $http({
            method: 'GET',
            url : '/api/users/1/projects'
        }).success(function(res){
            $scope.projects = res.data;
        });
    })

.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});
