var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    var cam = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 5, new BABYLON.Vector3(0, 3, 0), scene);
    var loader = new BABYLON.AssetsManager(scene);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,1,0),scene);
    var demo = loader.addMeshTask("demo02", "", "assets/", "demo02.obj");
    demo.onSuccess = function() {
        console.log("loaded");
    }
    loader.onFinish = function() {
        engine.runRenderLoop(function() {
            scene.render();
        })
    };
    loader.load();
    return scene;
}
createScene();