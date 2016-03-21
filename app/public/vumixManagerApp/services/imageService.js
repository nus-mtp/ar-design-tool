(function() {
  angular.module('vumixManagerApp.services')
    .factory('imageService', function($http) {
     return{
       
       addImage: function(image, upload_image, userId){
            var fd = new FormData();
            var uploadUrl = '/api/users/' + userId + '/images';
            fd.append('file', upload_image);
            fd.append('uid', userId);
            fd.append('image_name', image.image_name);
            fd.append('file_size',image.file_size);
            fd.append('file_extension', image.file_extension);
                  
            $http.post(uploadUrl, fd, {
                headers: {'Content-Type': undefined}
            },function errorCallback(res){
               console.log("error deleting the image");
           });
       }, 
        
       deleteImage: function(images, userId, id){
           return $http({
               method: 'DELETE',
               url: '/api/users/' + userId + '/images/' + id 
           }).then(function(res){
               for(var i =0; i < images.length; i++){
                   if(id === images[i].id){
                       images.splice(i,1);
                   }
               }
               return images;
           }, function errorCallback(res){
               console.log("error deleting image");
           });
       },
       
       updateImage: function(images, image, userId, id){
           return $http({
               method: 'PUT',
               url: '/api/users/' + userId + '/images/' + id      
           }).then(function(res){
               for(var i = 0; i < images.length; i++){
                   if(id === images[i].id){
                       images[i] = image;
                       return images[i];
                   }
               }
           }, function errorCallback(res){
               console.log("error getting the image");
           }); 
        },

     };
    }); 
})();