(function() {
  angular.module('vumixEditorApp.services')
    .factory('notificationService', function($rootScope, $timeout) {
      
      var notifications = [];
      
      var service = {};
      
      var notifyNotificationsChange = function() {
        $rootScope.$emit('$_notificationsChange');
      };
      
      service.subscribeToNotificationsChange = function($scope, callback) {
        var handler = $rootScope.$on('$_notificationsChange', callback);
        $scope.$on('$destroy', handler);
      };
      
      // sticky notification, unclickable. Resolve the issue to dismiss
      // id 0: warning, there are empty connectors
      service.addNotification = function(id) {
        if (id === 0) {
          notifications.push({
            mode: 'sticky',
            type: "warning",
            message: " - empty connector is found. Empty connector will be removed once page reloads. Resolve to dismiss."
          });
        }
        notifyNotificationsChange();
      };
      
      // non sticky notification
      service.addFreeNotification = function(type, message) {
        notifications.push({
          mode: 'free',
          type: type,
          message: message
        });
        notifyNotificationsChange();
      };
      
      service.getAllNotifications = function() {
        return notifications;  
      };
      
      service.dismiss = function(notification) {
        if (notification.mode === 'free') {
          notifications = $.grep(notifications, function(_notification) {
            return _notification.message != notification.message;
          });
          notifyNotificationsChange();
        }
      };
      
      return service;
      
    });
})();
      