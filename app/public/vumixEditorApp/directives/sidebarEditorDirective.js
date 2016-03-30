(function() {
  angular.module('vumixEditorApp.directives')
    .directive('sidebarEditor', function($timeout) {
      var minHeight = 25;
      var totalHeight = $(window).height() - 50;
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
      tmpl += '             <th class="col-xs-9">Model Name</th>';
      tmpl += '             <th class="col-xs-1">Action</th>';
      tmpl += '             <th class="col-xs-1"></th>';
      tmpl += '             <th class="col-xs-1"></th>';
      tmpl += '           </tr>';
      tmpl += '         </thead>';
      tmpl += '         <tbody>';
      tmpl += '           <tr ng-repeat="model in modelsOnScreen">';
      tmpl += '             <td>{{ model.instanceName }}</td>';
      tmpl += '             <td><input type="checkbox" ng-model="model.isClickable" /></td>';
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
            $("#panel-selector").outerHeight(totalHeight / 2.0);
            $("#panel-browser").outerHeight(totalHeight / 2.0);
          }

          $("#panel-selector").resizable({
            handles: 's',
            minHeight: minHeight,
            maxHeight: totalHeight - minHeight,
          resize: function(evt, ui) {
          $("#panel-browser").outerHeight(totalHeight - $("#panel-selector").outerHeight());
          }
          });

          $("#panel-browser").resizable({
            handles: 'n',
            minHeight: minHeight,
            maxHeight: $(window).height() - minHeight,
          resize: function(evt, ui) {		
          $("#panel-selector").outerHeight(totalHeight - $("#panel-browser").outerHeight());
          $(this).css("top", 0);
          }
          });

          $(".panel-button.equalise").on("click", equalise);

          $(".panel-button.maximise").on("click", function() {
            $(this).parent().parent().siblings().outerHeight(minHeight);
            $(this).parent().parent().outerHeight(totalHeight - minHeight);
          });

          $(".resizable-panels").height(totalHeight);
          $('[data-toggle="tooltip"]').tooltip();
          equalise();
        }
      }
    });  
})();