var canvas = document.getElementById("renderCanvas");
var option = document.getElementById("model-option");
var engine = new BABYLON.Engine(canvas, true);
var change = false;
var model = "teddy.obj";
var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 50, new BABYLON.Vector3(0, 3, 0), scene);
    cam.attachControl(canvas);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,1,0),scene);
    light.intensity = 0.5;
    BABYLON.SceneLoader.ImportMesh("", "assets/", model, scene, function (meshes) {});
    scene.beforeRender = function() {
        if(change) {
            scene.meshes.forEach(function(mesh) {
                mesh.dispose();
            });            
            BABYLON.SceneLoader.ImportMesh("", "assets/", model, scene, function (meshes) {});
            change = false;
        }
    }
    return scene;
}
var scene = createScene();
engine.runRenderLoop(function() {
    scene.render();
});
option.addEventListener("change", function(evt) {
    model = evt.target.value; 
    change = true;
});