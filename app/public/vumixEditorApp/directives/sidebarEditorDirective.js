(function() {
  angular.module('vumixEditorApp.directives')
    .directive('sidebarEditor', function($window) {
      var minHeight = 25;
      var totalHeight = $window.innerHeight - 50;
      var tmpl = "";
      tmpl += ' <div class="resizable-panels">';
      tmpl += '   <div class="panel panel-default" id="panel-selector">';      
      tmpl += '     <div class="panel-heading">';
      tmpl += '       <span class="panel-title">Selected Resources</span>';
      tmpl += '       <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Maximise" class="panel-button maximise"><i class="fa fa-angle-double-up"></i></span>';
      tmpl += '       <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Minimise" class="panel-button equalise"><i class="fa fa-angle-double-down"></i></span>';
      tmpl += '     </div>';
      tmpl += '     <div class="panel-body">';
      tmpl += '       <table class="table table-striped table-hover table-condensed">';
      tmpl += '         <thead>';
      tmpl += '           <tr class="warning">';
      tmpl += '             <th class="col-xs-10">Model Name</th>';
      tmpl += '             <th class="col-xs-2"></th>';
      tmpl += '           </tr>';
      tmpl += '         </thead>';
      tmpl += '         <tbody>';
      tmpl += '           <tr ng-repeat="model in modelsOnScreen" ng-click="selectModelOnScreen(model)">';
      tmpl += '             <td class="clickable">{{ model.instanceName }}</td>';
      tmpl += '             <td><a href="" ng-click="removeModelFromScreen(model)">Delete</a></td>';
      tmpl += '           </tr>';
      tmpl += '         </tbody>';
      tmpl += '       </table>';
      tmpl += '     </div>';
      tmpl += '   </div>';
      tmpl += '   <div class="panel panel-default" id="panel-browser">';      
      tmpl += '     <div class="panel-heading">';
      tmpl += '       <span class="panel-title">Resources Library</span>';
      tmpl += '       <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Maximise" class="panel-button maximise"><i class="fa fa-angle-double-up"></i></span>';
      tmpl += '       <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Minimise" class="panel-button equalise"><i class="fa fa-angle-double-down"></i></span>';
      tmpl += '       <span class="panel-button addModel" data-toggle="modal" data-target="#add-asset-to-local"><i class="fa fa-plus-square" style="margin-right: 5px;"></i>Add Model</span>';
      tmpl += '     </div>';
      tmpl += '     <div class="panel-body">';
      tmpl += '       <table class="table table-striped table-hover table-condensed">';
      tmpl += '         <thead>';
      tmpl += '           <tr class="warning">';
      tmpl += '             <th class="col-xs-10">Model Name</th>';
      tmpl += '             <th class="col-xs-2"></th>';
      tmpl += '           </tr>';
      tmpl += '         </thead>';
      tmpl += '         <tbody>';
      tmpl += '           <tr ng-repeat="model in modelsAvailable">';
      tmpl += '             <td class="clickable">{{ model.name }}</td>';
      tmpl += '             <td><a href="" ng-click="addModelToScreen(model)">Add</a></td>';
      tmpl += '           </tr>';
      tmpl += '           <tr>';
      tmpl += '             <td><input ng-model="textModel" type="text" class="form-control custom-input input-sm" ng-focus="unityMapperService.activateKeyboard()" ng-blur="unityMapperService.deactivateKeyboard()" placeholder="Enter 3D text"></td>';
      tmpl += '             <td style="vertical-align:middle;"><a href="" ng-click="addText(textModel)">Add</a></td>';
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
              totalHeight = $window.innerHeight - 50;
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
            maxHeight: $window.innerHeight - minHeight,
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