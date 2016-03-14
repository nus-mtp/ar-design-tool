var unity_var 	= require('../config/unity');
var fs 			= require('fs');

module.exports = function(uid, pid) {
	var project_path = unity_var.project_path + uid + '/' + pid + '/';
	var unity_cmd = '"' + unity_var.unity + '" -createProject "' + project_path + '" -importPackage "' + unity_var.app_builder + '" -quit';
		
	try {
		console.log(fs.statSync(project_path))	
	} catch (e) {
		try {
			var makePath = unity_var.project_path + uid + '/';
			fs.mkdirSync(makePath) 
			makePath = makePath + pid + '/';
			fs.mkdirSync(makePath);
		} catch (e) {
			if (e.code == 'EEXIST') {
				try {
					var makePath = unity_var.project_path + uid + '/' + pid + '/';
					fs.mkdirSync(makePath);
				} catch (e) {
					console.log(e);
				}
			}
		}
	}

	const spawn = require('child_process').exec;
	const unity	= spawn(unity_cmd);

	unity.stdout.on('dara', (data) => {
		console.log(`stdout: ${data}`);
	});

	unity.stderr.on('dara', (data) => {
		console.log(`stderr: ${data}`);
	});

	unity.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
	// const ping 		= spawn('tracert www.google.com');
	// const git		= spawn('git branch', ['-l']);

	// git.stdout.on('data', (data) => {
	// 	console.log(`stdout: ${data}`);
	// });

	// git.stderr.on('data', (data) => {
	// 	console.log(`stderr: ${data}`);
	// });

	// git.on('close', (code) => {
	// 	console.log(`child process exited with code ${code}`);
	// });		

	// ping.stdout.on('data', (data) => {
	// 	console.log(`stdout: ${data}`);
	// });

	// ping.stderr.on('data', (data) => {
	// 	console.log(`stderr: ${data}`);
	// });

	// ping.on('close', (code) => {
	// 	console.log(`child process exited with code ${code}`);
	// });		
};