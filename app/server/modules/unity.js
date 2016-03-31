var file_paths 	= require('../config/file_path'),
	utils 		= require('../modules/utils'),
	path 		= require('path'),
	fs 			= require('fs');

const exec		= require('child_process').exec;

var unity_path = '/unity/';
var model_path = '/models/';
var vuforia_name = "marker.unitypackage";

var rebuildVuforiaPackage = function(uid, pid) {
	console.log('rebuilding vuforia package...');
	var project_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var rebuild_cmd 	= '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.ImportPackage -quit -batchmode';
		
	console.log('running: ' + rebuild_cmd);
	const rebuild = exec(rebuild_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
	rebuild.on('exit', function(code) {
		console.log('Rebuild Vuforia pkg child process exited with code ' + code);
	});
};

var moveVuforia = function(location, uid, pid, fileName) {
	console.log('in moveVuforia');
	var project_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid);
	utils.moveFileToDest(location, project_path+file_paths.vuforia+fileName, rebuildVuforiaPackage(uid, pid));
};

var updateVuforia = function(uid, pid, vuforia_pkg) {
	console.log('Updating Vuforia pkg');
	moveVuforia(vuforia_pkg.path, uid, pid, vuforia_name);
};

var createProj = function(uid, pid, vuforia_pkg, callback, failCallback) {
	var public_project_path = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/');
	var project_path 		= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var unity_cmd 			= '"'+file_paths.unity+'" -createProject "'+project_path+'" -importPackage "'+path.join(__dirname, '../../'+file_paths.app_builder)+'" -quit';

	utils.checkExistsIfNotCreate(project_path);
	utils.checkExistsIfNotCreate(public_project_path);
	
	console.log('running: ' + unity_cmd);
	const unity	= exec(unity_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
			failCallback(error);
		}
	});
	unity.on('exit', function(code) {
		moveVuforia(vuforia_pkg.path, uid, pid, vuforia_name);
		console.log("Creating new project child process exited with code " + code);
		callback();
		//TODO: remove this after testing
		// moveVuforia(vuforia_pkg.path, uid, pid, vuforia_pkg.originalname);
	});
};

var deleteProj = function(uid, pid) {
	var public_project_path = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/');
	var project_path 		= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	console.log('Deleting public project dir: ' + public_project_path);
	utils.deleteDir(public_project_path);
	console.log('Deleting project dir: ' + project_path);
	utils.deleteDir(project_path);
};

var moveModel = function(uid, fileName) {
	console.log('moving model into model library');
	var dest_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path);
	var tmp_path 	= path.join(__dirname, '../../'+file_paths.storage_path+'/'+fileName);
	utils.checkExistsIfNotCreate(dest_path, function() {
		console.log('completed dir check');
		console.log('moving model to model library');
		utils.moveFileToDest(tmp_path, dest_path+fileName);
		// utils.moveFileToDest(tmp_path, dest_path+fileName, function() {
			// console.log('completed moving model to model library')
			// console.log('going to copy model now')
			// TODO: remove this
			// copyModel(uid, '6', fileName);
		// });	
	});
};

var deleteModel = function(uid, fileName) {
	var modelFile_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path+fileName);
	utils.deleteFile(modelFile_path);
};

var copyModel = function(uid, pid, fileName) {
	console.log('copying model into project '+pid+' dir');
	var modelFile_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path+fileName);
	var destination = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.models+fileName);

module.exports = function(uid, pid) {
	var project_path 	= unity_var.project_path + uid + '/' + pid + '/';
	var unity_cmd 		= '"' + unity_var.unity + '" -createProject "' + project_path + '" -importPackage "' + unity_var.app_builder + '"';
	var makePath 		= unity_var.project_path + uid + '/';
	try {
		console.log(fs.statSync(project_path));	
	} catch (e) {
		try {
			fs.mkdirSync(makePath); 
			makePath = makePath + pid + '/';
			fs.mkdirSync(makePath);
		} catch (e) {
			if (e.code == 'EEXIST') {
				try {
					makePath = unity_var.project_path + uid + '/' + pid + '/';
					fs.mkdirSync(makePath);
				} catch (e) {
					console.log(e);
				}
			}
		}
	});
	rebuild.on('exit', function(code) {
		console.log("Rebuilding Assetbundle child process exited with code " + code);
	});
};

var buildApk = function(uid, pid) {
	console.log('building apk for projectid: ' + pid);
	var project_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid);
	var down_path 	 = project_path+file_paths.download;

	project_path += '/';
	
	var buildApkCmd	 = '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.BuildAndroid2D -quit -batchmode';

	console.log('running: ' + buildApkCmd);
	const buildAPK = exec(buildApkCmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
		}
	);
	unity.on('close', function(code) {
		console.log("child process exited with code " + code);
	});
	buildAPK.on('exit', function(code) {
		console.log("buildAPK child process exited with code " + code);
		return down_path;
	});
};

var moveStateFile = function(uid, pid, stateFile) {
	console.log('saving state.dat');
	dest_path = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/'+stateFile.originalname);
	utils.moveFileToDest(stateFile.path, dest_path);	
};

module.exports.rebuildAssetBundle 	= rebuildAssetBundle;
module.exports.moveStateFile		= moveStateFile;
module.exports.updateVuforia 		= updateVuforia;
module.exports.deleteModel 			= deleteModel;
module.exports.createProj 			= createProj;
module.exports.deleteProj 			= deleteProj;
module.exports.moveModel 			= moveModel;
module.exports.copyModel 			= copyModel;
module.exports.buildApk				= buildApk;
