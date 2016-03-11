var unity_var = require('../config/unity');

module.exports = function() {
	const spawn 	= require('child_process').exec;

	// const unity		= spawn(unity_var.unity)
	const ping 		= spawn('tracert www.google.com');
	const git		= spawn('git branch', ['-l']);

	git.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	git.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	git.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});		

	ping.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ping.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	ping.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});		
};