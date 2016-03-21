var file_paths 	= require('../config/file_path'),
	utils 		= require('../modules/utils'),
	path 		= require('path');

const exec		= require('child_process').exec;

var unity_path = '/unity/';

var rebuildPackage = function(uid, pid) {
	console.log('rebuilding assetbundle...');
	var project_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var rebuild_cmd 	= '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.ImpotrtPackage';
	
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
		// change original filename to marker vuforia
		moveVuforia(vuforia_pkg.path, uid, pid, vuforia_pkg.originalname);
		console.log("child process exited with code " + code);
	});
};

var deleteProj = function(uid, pid) {
	var project_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	console.log('Deleting project dir: ' + project_path);
	utils.deleteDir(project_path);
}

module.exports.rebuildPackage 	= rebuildPackage;
module.exports.moveVuforia 		= moveVuforia;
module.exports.createProj 		= createProj;
module.exports.deleteProj		= deleteProj;