var file_paths 	= require('../config/file_path'),
	utils 		= require('../modules/utils'),
	path 		= require('path'),
	fs 			= require('fs');

const exec		= require('child_process').exec;

var unity_path 		= '/unity/';
var model_path 		= '/models/';
var state_dat_file 	= 'state.dat';
var vuforia_name 	= "marker.unitypackage";

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

var copyStateDat = function(uid, pid) {
	console.log('copying state dat...');
	var state_dat_loc 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.state+state_dat_file);
	var state_dest 		= path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/'+state_dat_file);
	utils.saveFileToDest(state_dat_loc, state_dest);
}

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
		copyStateDat(uid, pid);
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

	try {
		var readModel = fs.createReadStream(modelFile_path);
		var writeModel = fs.createWriteStream(destination);

		readModel.pipe(writeModel, {end: false});
		readModel.on('end', function() {
			console.log('Finished copying model to '+destination);
			writeModel.end();
			rebuildAssetBundle(uid, pid);
		});
	} catch(e) {
		console.log(e);
	}
};

var rebuildAssetBundle = function(uid, pid) {
	console.log('rebuilding assetbundle...');
	var project_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var rebuild_cmd 	= '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod CreateAssetBundles.BuildAllAssetBundles -quit -batchmode';
	// places webglbundles.unity3d inside Assets folder of unity project
	console.log('running: ' + rebuild_cmd);
	const rebuild = exec(rebuild_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
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
	});
	buildAPK.on('exit', function(code) {
		console.log("buildAPK child process exited with code " + code);
		return down_path;
	});
};

var moveStateFile = function(uid, pid, stateFile) {
	console.log('saving state file');
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