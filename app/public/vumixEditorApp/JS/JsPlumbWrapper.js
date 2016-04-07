  
  var angularHelper = (function () {
    var angularHelper = function () { };
    var defaultApplicationName = "vumixEditorApp";
    angularHelper.compile = function ($targetDom, htmlToCompile, applicationName) {
      var $injector = angular.injector(["ng", applicationName || defaultApplicationName]);
      $injector.invoke(["$compile", "$rootScope", function ($compile, $rootScope) {
        var $scope = $targetDom.append(htmlToCompile).scope();
        $compile($targetDom)($scope || $rootScope);
        $rootScope.$digest();
      }]);
    }
    return angularHelper;
  })();
  
    var numberOfElements = 0;
    var htmlBase = 'drawingArea';
    
    jsPlumb.ready(function () {
        
    var id = 0;
    var options = [];
    var stateName = $('<select>');
    stateName.append($('<option></option>').attr('value', '#').text('Select an option'));
	//FIX DOM:
	$(("#taskcontainer0"))[0].innerHTML = $(("#taskcontainer0"))[0].innerHTML;
    
   
	jsPlumb.draggable($(".task"));
    
	jsPlumb.importDefaults({
		Endpoint : ["Dot", {radius:15}],
		EndpointStyle : { fillStyle : "gray" },
		HoverPaintStyle : {strokeStyle:"gray", lineWidth:10 },
        ConnectionOverlays : [
					[ "Arrow", { location:0.8 } ],
					[ "Label", { 
						location:0.2,
						id:"label",
					}]
				]
    });
    
	var workflowConnectorStartpoint = {
		isSource: true,
		isTarget: true,
		maxConnections: 10,					 
		anchor:"BottomCenter",
        paintStyle: { fillStyle: 'lightblue' },
		endpoint : ["Dot", {radius:15}],
        overlays:[
                	[ "Label", { 
	                	location:[0.5, 1.5], 
	                } ]
                ]
        /*beforeDetach: function (conn) {
        return confirm("Detach connection?");
        }*/
	};
	
	var workflowConnectorEndpoint = {
		isSource: false,
		isTarget: true,
		maxConnections: 10,				 
		anchor: 'TopCenter',
		paintStyle: { fillStyle: 'gray' },
		endpoint: ["Dot", {radius:15}],
        overlays:[
                	[ "Label", { 
	                	location:[0.5, 1.5], 
	                } ]
                ]
	};
	
    //the code below allows source without circle but dragging has to be disabled first. 
    //jsPlumb.makeSource(
    //    $('.startpoint'), {
    //        anchor: 'Continuous'
    //});
    
    
	jsPlumb.addEndpoint(
		$('.startpoint'),
		workflowConnectorStartpoint
	);
	
    var makeTarget = {
        anchor: 'Continuous',
        /*beforeDetach: function (conn) {
        return confirm("Detach connection?");
        }*/
    };
    
    jsPlumb.makeTarget(
        $('.endpoint'), 
        makeTarget
    );
    
    var init = function(connection) {
        console.log("this runs");
				connection.getOverlay("label").setLabel("whatever");
	};
    
    jsPlumb.bind('click', function (connection, e) {
        var options = [];
        				
        while(options.length > 0) {
        options.pop();
        }
        
        if (connection.sourceId === "startpoint"){
            connection.sourceId = "0";
        }
        
        //$('#clickableModal').modal('show');
        
        showClickableModel(connection.Id);
        
        sourceId = parseInt(connection.sourceId);
        options = getModelNames(sourceId);
        connection.getOverlay("label").setLabel(options);
        console.log("clicked options " + options);
       
    });
		
	$('#'+htmlBase).on("click", ".button_remove", function () {
		var parentnode = $(this)[0].parentNode.parentNode;
		jsPlumb.detachAllConnections(parentnode);
		jsPlumb.removeAllEndpoints(parentnode);
		$(parentnode).remove(); 
	});
						
     $('#'+htmlBase).dblclick(function(e) {
         addTask(undefined,e);
     });
    
	$('.button_save_task').click(function(){
		saveFlowchart();
	});
	
	$('.button_load_task').click(function(){
		loadFlowchart();
	});
});

function addTask(id, e){

	if(typeof id === "undefined"){
		numberOfElements++;
		//id = "taskcontainer" + numberOfElements;
        id = numberOfElements;
	}
	
    var newState = $('<div class="task" id="' + id + '" data-nodetype="task">');
    
    var top = e.pageY;
    var left = e.pageX;
    var width = $(window).width();
    
    if (left >= (0.8*width)){
        left = 0.75*width;
    }
    
    else if (left <= 320){
        left = 320;
    }
    
    if (top <= 150) {
        top = 150;
    }
    
    else if (top >=530){
        top = 530;
    }
    
    //double click anywhere to create new state
    newState.css({
		  'top': top-150,
		  'left': left-300
		});
        
    newState.appendTo('#'+htmlBase).html($(("#taskcontainer0"))[0].innerHTML);
    var taskSourceConnectorEndpoint = {
		isSource: true,
		isTarget: true,
		maxConnections: 10,
        anchor:"BottomCenter",
        paintStyle: { fillStyle: 'lightblue' },
		endpoint : ["Dot", {radius:15}],
        overlays:[
                	[ "Label", { 
	                	location:[0.5, 1.5], 
	                } ]
                ]
	};
	
    
    
	jsPlumb.addEndpoint(
		$('#'+id),
		taskSourceConnectorEndpoint
	);
	
    //the code below allows source without circle but dragging has to be disabled first. 
    //jsPlumb.makeSource(
    //    $('#'+id), {
    //        anchor: 'Continuous'
    //    });
    
	jsPlumb.makeTarget(
        $('#'+id), {
		  anchor: 'Continuous'
		});
    
	jsPlumb.draggable($('#' + id),{containment:"parent"});
	return id;
}
    
function saveFlowchart(){
	var nodes = []
	$(".node").each(function (idx, elem) {
	var $elem = $(elem);
	var endpoints = jsPlumb.getEndpoints($elem.attr('id'));
	console.log('endpoints of '+$elem.attr('id'));
	console.log(endpoints);
		nodes.push({
			blockId: $elem.attr('id'),
			nodetype: $elem.attr('data-nodetype'),
			positionX: parseInt($elem.css("left"), 10),
			positionY: parseInt($elem.css("top"), 10)
		});
	});
	var connections = [];
	$.each(jsPlumb.getConnections(), function (idx, connection) {
		connections.push({
			connectionId: connection.id,
			pageSourceId: connection.sourceId,
			pageTargetId: connection.targetId
		});
	});
	
	var flowChart = {};
	flowChart.nodes = nodes;
	flowChart.connections = connections;
	flowChart.numberOfElements = numberOfElements;
	
	var flowChartJson = JSON.stringify(flowChart);
	//console.log(flowChartJson);
	
	$('#jsonOutput').val(flowChartJson);
}

function loadFlowchart(){
	var flowChartJson = $('#jsonOutput').val();
	var flowChart = JSON.parse(flowChartJson);
	var nodes = flowChart.nodes;
	$.each(nodes, function( index, elem ) {
		if(elem.nodetype === 'startpoint'){
			repositionElement('startpoint', elem.positionX, elem.positionY);
		}else if(elem.nodetype === 'endpoint'){
			repositionElement('endpoint', elem.positionX, elem.positionY);
		}else if(elem.nodetype === 'task'){
			var id = addTask(elem.blockId);
			repositionElement(id, elem.positionX, elem.positionY);
		}else if(elem.nodetype === 'decision'){
			var id = addDecision(elem.blockId);
			repositionElement(id, elem.positionX, elem.positionY);
		}else{
			
		}
	});
							
	var connections = flowChart.connections;
	$.each(connections, function( index, elem ) {
		 var connection1 = jsPlumb.connect({
			source: elem.pageSourceId,
			target: elem.pageTargetId,
			anchors: ["BottomCenter", [0.75, 0, 0, -1]]
			
		});
	});
	
	numberOfElements = flowChart.numberOfElements;
}


function repositionElement(id, posX, posY){
	$('#'+id).css('left', posX);
	$('#'+id).css('top', posY);
	jsPlumb.repaint(id);
}

function attachClickable(id){
        var clickableObjects = [];
        var item = 0;
        item = id;
        
        var el = $('[ng-app=vumixEditorApp]')[0];
        clickableObjects = angular.element(el).injector().get('stateService').getStateObjects(item);
        console.log("this function attachClickable was called" + " " + item + " " + clickableObjects);

        return clickableObjects;
}

function getModelNames(item){
    var modelsInState = [];
    var nameofModels = [];
    var i, id=0;
    id = item;
    
    modelsInState = attachClickable(id);
    
    console.log("length of models in state" + modelsInState.length);
    
    for (i=0; i< modelsInState.length; i++){
        nameofModels[i] = modelsInState[i].instanceName;
    };
        console.log("this function getModelNames was called" + " " + id + " " + nameofModels);

    return nameofModels;
}

function showClickableModel(edgeId){
    
}
