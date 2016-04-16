var file_paths 	= require('../config/file_path'),
	utils 		= require('../modules/utils'),
	path 		= require('path'),
	fs 			= require('fs');

const exec		= require('child_process').exec;

var unity_path 		= '/unity/';
var model_path 		= '/models/';
var state_dat_file 	= 'state.dat';
var copy_state_name = 'copyState.dat';
var vuforia_name 	= "marker.unitypackage";
var assetbundle_name = '/webglbundles.unity3d';

var rebuildVuforiaPackage = function(uid, pid, vuforia_path) {
	console.log('rebuilding vuforia package...');
	var project_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var rebuild_cmd 	= '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -importPackage "'+vuforia_path+'" -quit -batchmode';
		
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
	var vuforia_path = project_path+file_paths.vuforia+fileName;
	utils.moveFileToDest(location, vuforia_path, function() {
		rebuildVuforiaPackage(uid, pid, vuforia_path);
	});
};

var updateVuforia = function(uid, pid, vuforia_pkg) {
	console.log('Updating Vuforia pkg');
	moveVuforia(vuforia_pkg.path, uid, pid, vuforia_name);
};

var createProj = function(uid, pid, vuforia_pkg, callback, failCallback) {
	var public_project_path = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/');
	var project_path 		= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var unity_cmd 			= '"'+file_paths.unity+'" -createProject "'+project_path+'" -importPackage "'+path.join(__dirname, '../../'+file_paths.app_builder)+'" -quit -batchmode';

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
		if(code==0) {
			moveVuforia(vuforia_pkg.path, uid, pid, vuforia_name);
			copyDefaultState(uid, pid);
			copyAssetBundle(uid, pid);
			console.log("Creating new project child process exited with code " + code);
			callback();
		}
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

var moveModel = function(uid, fileName, destName) {
	console.log('moving model into model library');
	var dest_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path);
	var tmp_path 	= path.join(__dirname, '../../'+file_paths.storage_path+'/'+fileName);
	utils.checkExistsIfNotCreate(dest_path, function() {
		console.log('completed dir check');
		console.log('moving model to model library');
		utils.moveFileToDest(tmp_path, dest_path+destName);
	});
};

var deleteModel = function(uid, fileName) {
	var modelFile_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path+fileName);
	utils.deleteFile(modelFile_path);
};

var copyModel = function(uid, pid, fileName, goodcallback, badcallback) {
	console.log('copying model into project '+pid+' dir');
	var file = path.join(__dirname, '../../'+file_paths.storage_path+uid+model_path+fileName);
	var dest = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.models+fileName);

	utils.copyFile(file, dest, function() {
		goodcallback();
	}, function(err) {
		console.log("error found in copyModel");
		badcallback(fileName, err);
	});
};

var removeProjModel = function(uid, pid, fileName, goodcallback, badcallback) {
	console.log('removing model from project '+pid+' dir');
	var file = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.models+fileName);

	utils.deleteFile(file, function() {
		goodcallback();
	}, function(err) {
		console.log("error found in removeProjModel");
		badcallback(fileName, err);
	});
};

var copyAssetBundle = function(uid, pid, goodcallback, badcallback) {
	console.log("copying default asset bundle");
	var assetPath = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.assetbundle);
	var dest = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+assetbundle_name);

	utils.copyFile(assetPath, dest, function() {
		console.log("completed copying assetbundle to public folders");
		if(goodcallback)
			goodcallback();
	}, function(err) {
		console.log("error copying assetbundle to public folders");
		if(badcallback)
			badcallback(err);
	});
};

var rebuildAssetBundle = function(uid, pid, goodcallback, badcallback) {
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
			badcallback(error);			
		}
	});
	rebuild.on('exit', function(code, signal) {
		if(code==0) {
			console.log("Rebuilding Assetbundle child process exited with code " + code);
			copyAssetBundle(uid, pid, function(){
				goodcallback();
			}, function(err) {
				badcallback(err);
			});	
		}
	});
};

var buildApk = function(uid, pid, goodcallback, failcallback) {
	console.log('building apk for projectid: ' + pid);
	var project_path = path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+'/');
	var down_path 	 = project_path+file_paths.download;
	var buildApkCmd	 = '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.BuildAndroid2D';

	console.log('running: ' + buildApkCmd);
	const buildAPK = exec(buildApkCmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
			failcallback(error);
		}
	});
	buildAPK.on('exit', function(code) {
		if(code==0) {
			console.log("buildAPK child process exited with code " + code);
			goodcallback(down_path);	
		}
	});
};

var moveStateFile = function(uid, pid, stateFile, goodcall, badcall) {
	console.log('saving state file');
	dest_path = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/'+state_dat_file);
	utils.moveFileToDest(stateFile.path, dest_path, function() {
		goodcall();
	}, function(err) {
		badcall(err);
	});	
};

var moveCopyState = function(uid, pid, goodcall, badcall) {
	console.log('saving state file');
	tmp 		= path.join(__dirname, '../../'+file_paths.storage_path+copy_state_name);
	dest_path 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.state+state_dat_file);
	utils.moveFileToDest(tmp, dest_path, function() {
		goodcall();
	}, function(err) {
		badcall(err);
	});		
};

var copyDefaultState = function(uid, pid) {
	console.log('copying default state dat...');
	var state_dat_loc 	= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.state+state_dat_file);
	var state_dest 		= path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/'+state_dat_file);
	utils.copyFile(state_dat_loc, state_dest);
};

var copyStateDat = function(uid, pid, callback, badcall) {
	console.log('copying state dat to server...');
	var state_dat_loc 	= path.join(__dirname, '../../'+file_paths.storage_path+state_dat_file);
	var state_dest 		= path.join(__dirname, '../../'+file_paths.storage_path+uid+unity_path+pid+file_paths.state+state_dat_file);
	utils.copyFile(state_dat_loc, state_dest, function() {
		callback();
	}, function(err) {
		badcall(err);
	});	
};

var saveStateJson = function(uid, pid, json, goodcall, badcall) {
	console.log('saving state json');
	var stateJsonDir = 'state.json';
	var dest = path.join(__dirname, '../../'+file_paths.public_path+uid+'/'+pid+'/'+stateJsonDir);
	utils.writeJson(dest, json, function() {
		goodcall();
	}, function(err) {
		badcall(err);
	});
};

module.exports.rebuildAssetBundle 	= rebuildAssetBundle;
module.exports.updateVuforia 		= updateVuforia;

module.exports.moveStateFile		= moveStateFile;
module.exports.moveCopyState		= moveCopyState;
module.exports.saveStateJson 		= saveStateJson;
module.exports.copyStateDat			= copyStateDat;

module.exports.createProj 			= createProj;
module.exports.deleteProj 			= deleteProj;

module.exports.removeProjModel 		= removeProjModel;		
module.exports.deleteModel 			= deleteModel;
module.exports.moveModel 			= moveModel;
module.exports.copyModel 			= copyModel;

module.exports.buildApk				= buildApk;