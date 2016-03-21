var file_paths 	= require('../config/file_path'),
	utils 		= require('../modules/utils'),
	path 		= require('path');

const exec		= require('child_process').exec;

var unity_path = '/unity/';
var model_path = '/models/';

var rebuildPackage = function(uid, pid) {
	console.log('rebuilding assetbundle...');
	var project_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var rebuild_cmd 	= '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.ImpotrtPackage -quit';
	
	utils.checkExistsIfNotCreate(project_path);
	
	console.log('running: ' + rebuild_cmd);
	const rebuild = exec(rebuild_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
};

var moveVuforia = function(location, uid, pid, fileName) {
	console.log('in moveVuforia');
	var project_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	utils.moveFileToDest(location, project_path+file_paths.vuforia+'/'+fileName);
	rebuildPackage(uid, pid);
}

var createProj = function(uid, pid, vuforia_pkg) {
	var project_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var unity_cmd 		= '"'+file_paths.unity+'" -createProject "'+project_path+'" -importPackage "'+path.join(__dirname, '../../'+file_paths.app_builder)+'" -quit';
	var makePath 		= file_paths.storage_path+uid+'/';
	
	utils.checkExistsIfNotCreate(project_path);
	
	console.log('running: ' + unity_cmd);
	const unity	= exec(unity_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	unity.on('exit', function(code) {
		// change original filename to marker.unitypackage
		moveVuforia(vuforia_pkg.path, uid, pid, vuforia_pkg.originalname);
		console.log("child process exited with code " + code);
	});
};

var deleteProj = function(uid, pid) {
	var project_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	console.log('Deleting project dir: ' + project_path);
	utils.deleteDir(project_path);
}

var moveModel = function(uid, fileName) {
	var dest_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path+'/');
	var tmp_path 	= path.join(__dirname, '../../'+file_paths.storage_path+'/'+fileName);
	utils.checkExistsIfNotCreate(dest_path);
	utils.moveFileToDest(tmp_path, dest_path+fileName);
};

var deleteModel = function(uid, fileName) {
	var modelFile_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path+'/'+fileName);
	utils.deleteFile(modelFile_path);
};

module.exports.deleteModel 	= deleteModel;
module.exports.createProj 	= createProj;
module.exports.deleteProj 	= deleteProj;
module.exports.moveModel 	= moveModel;