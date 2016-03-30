var unity_var 	= require('../config/unity');
var fs 			= require('fs');

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
	}
	console.log(unity_cmd);
	const exec	= require('child_process').exec;
	const unity	= exec(unity_cmd, function(error, stdout, stderr) {
			console.log("stdout: " + stdout);
			console.log("stderr: " + stderr);	
			if (error !== null) {
				console.log("exec error: " + error);
			}
		}
	);
	unity.on('close', function(code) {
		console.log("child process exited with code " + code);
	});
};