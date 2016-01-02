var canvas = document.getElementById("render-canvas");
var form = document.getElementById("change-model");
var engine = new BABYLON.Engine(canvas, true);
var change = false;
var modelurl="";

var scene = new BABYLON.Scene(engine);
var cam = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 50, new BABYLON.Vector3(0, 3, 0), scene);
cam.attachControl(canvas);
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,1,0),scene);
light.intensity = 0.5;
scene.beforeRender = function() {
    if(change) {
        change = false;
        scene.meshes.forEach(function(mesh) {
            mesh.dispose();
        });            
        BABYLON.SceneLoader.ImportMesh("", modelurl, "", scene, function (meshes) {
            console.log(meshes);
        });
    };
};
    
engine.runRenderLoop(function() {
    scene.render();
});
form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    var reader = new FileReader();
    reader.onload = function(evt) {
        modelurl = evt.target.result;
        change = true;
    }
    reader.readAsDataURL(evt.target[0].files[0]);
});