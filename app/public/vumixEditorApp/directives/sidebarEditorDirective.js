(function() {
  angular.module('vumixEditorApp.directives')
    .directive('sidebarEditor', function($window) {
      var minHeight = 25;
      var totalHeight = $window.outerHeight - 50;
      var tmpl = "";
      tmpl += ' <div class="resizable-panels">';
      tmpl += '   <div class="panel panel-default" id="panel-selector">';      
      tmpl += '     <div class="panel-heading">';
      tmpl += '       <span class="panel-title">Selector</span>';
      tmpl += '       <span class="panel-button maximise"><i class="fa fa-square-o"></i></span>';
      tmpl += '       <span class="panel-button equalise"><i class="fa fa-server"></i></span>';
      tmpl += '     </div>';
      tmpl += '     <div class="panel-body">';
      tmpl += '       <table class="table table-striped table-hover table-condensed">';
      tmpl += '         <thead>';
      tmpl += '           <tr class="warning">';
      tmpl += '             <th class="col-xs-8">Model Name</th>';
      tmpl += '             <th class="col-xs-2">Action</th>';
      tmpl += '             <th class="col-xs-2"></th>';
      tmpl += '           </tr>';
      tmpl += '         </thead>';
      tmpl += '         <tbody>';
      tmpl += '           <tr ng-repeat="model in modelsOnScreen">';
      tmpl += '             <td>{{ model.instanceName }}</td>';
      tmpl += '             <td><a href="" ng-click="removeModelFromScreen(model)">delete</a></td>';
      tmpl += '             <td><a href="" ng-click="selectModelOnScreen(model)">select</a></td>';
      tmpl += '           </tr>';
      tmpl += '         </tbody>';
      tmpl += '       </table>';
      tmpl += '     </div>';
      tmpl += '   </div>';
      tmpl += '   <div class="panel panel-default" id="panel-browser">';      
      tmpl += '     <div class="panel-heading">';
      tmpl += '       <span class="panel-title">Browser</span>';
      tmpl += '       <span class="panel-button addModel" data-toggle="modal" data-target="#add-asset"><i class="fa fa-plus-square"></i></span>';
      tmpl += '       <span class="panel-button maximise"><i class="fa fa-square-o"></i></span>';
      tmpl += '       <span class="panel-button equalise"><i class="fa fa-server"></i></span>';
      tmpl += '     </div>';
      tmpl += '     <div class="panel-body">';
      tmpl += '       <table class="table table-striped table-hover table-condensed">';
      tmpl += '         <thead>';
      tmpl += '           <tr class="warning">';
      tmpl += '             <th class="col-xs-10">Model Name</th>';
      tmpl += '             <th class="col-xs-2">Action</th>';
      tmpl += '           </tr>';
      tmpl += '         </thead>';
      tmpl += '         <tbody>';
      tmpl += '           <tr ng-repeat="model in modelsAvailable">';
      tmpl += '             <td>{{ model.name }}</td>';
      tmpl += '             <td><a href="" ng-click="addModelToScreen(model)">Add</a></td>';
      tmpl += '           </tr>';
      tmpl += '         </tbody>';
      tmpl += '       </table>';
      tmpl += '     </div>';
      tmpl += '   </div>';
      tmpl += ' </div>';
      return {
        restrict: 'E',
        scope: false,
        replace: true,
        template: tmpl,
        link: function($scope, $el, $attr, $ctrl) {

          var equalise = function() {
            $el.find("#panel-selector").outerHeight(totalHeight / 2.0);
            $el.find("#panel-browser").outerHeight(totalHeight / 2.0);
          }
          
          angular.element($window).bind('resize', function(evt) {
            if (this === evt.target) {
              totalHeight = $window.outerHeight - 50;
              equalise();
            }
          });          

          $el.find("#panel-selector").resizable({
            handles: 's',
            minHeight: minHeight,
            maxHeight: totalHeight - minHeight,
            resize: function(evt, ui) {
              $el.find("#panel-browser").outerHeight(totalHeight - $("#panel-selector").outerHeight());
            }
          });

          $el.find("#panel-browser").resizable({
            handles: 'n',
            minHeight: minHeight,
            maxHeight: $window.outerHeight - minHeight,
            resize: function(evt, ui) {		
              $el.find("#panel-selector").outerHeight(totalHeight - $("#panel-browser").outerHeight());
              $(this).css("top", 0);
            }
          });

          $el.find(".panel-button.equalise").on("click", equalise);

          $el.find(".panel-button.maximise").on("click", function() {
            $(this).parent().parent().siblings().outerHeight(minHeight);
            $(this).parent().parent().outerHeight(totalHeight - minHeight);
          });

          $el.find(".resizable-panels").height(totalHeight);
          $el.find('[data-toggle="tooltip"]').tooltip();
          equalise();
        }
      }
    });  
})();