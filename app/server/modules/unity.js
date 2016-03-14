var utils 		= require('../modules/utils'),
	unity_var 	= require('../config/unity');

const exec		= require('child_process').exec;

var createProj = function(uid, pid) {
	var project_path 	= unity_var.project_path+uid+'/'+pid+'/';
	var unity_cmd 		= '"'+unity_var.unity+'" -createProject "'+project_path+'" -importPackage "'+unity_var.app_builder+'" -quit';
	var makePath 		= unity_var.project_path+uid+'/';
	
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
	var project_path 	= unity_var.project_path+uid+'/'+pid+'/';
	var rebuild_cmd 	= '"'+unity_var.unity+'" ' + '-projectPath "'+project_path+'" -executeMethod BuildProject.ImpotrtPackage';
	
	utiils.checkExistsIfNotCreate(project_path);

	console.log('running: ' + rebuild_cmd);
	const rebuild = exec(rebuild_cmd, function(error, stdout, stderr) {
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);	
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
}

module.exports.createProj = createProj;
module.exports.rebuildPackage = rebuildPackage;