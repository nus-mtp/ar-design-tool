var file_paths 	= require('../config/file_path'),
	utils 		= require('../modules/utils');

const exec		= require('child_process').exec;

var createProj = function(uid, pid) {
	var project_path 	= file_paths.storage_path+uid+'/'+pid+'/';
	var unity_cmd 		= '"'+file_paths.unity+'" -createProject "'+project_path+'" -importPackage "'+file_paths.app_builder+'" -quit';
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
	unity.on('close', function(code) {
		console.log("child process exited with code " + code);
	});
};

var rebuildPackage = function(uid, pid) {
	var project_path 	= file_paths.storage_path+uid+'/'+pid+'/';
	var rebuild_cmd 	= '"'+file_paths.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.ImpotrtPackage';
	
	utiils.checkExistsIfNotCreate(project_path);
	
	console.log('running: ' + rebuild_cmd);
	const rebuild = exec(rebuild_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
};

module.exports.rebuildPackage 	= rebuildPackage;
module.exports.createProj 		= createProj;