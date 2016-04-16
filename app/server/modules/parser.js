/**
 * @module Parser
 * @parent Modules
 * Use the parser module to add flags or options to the program. 
 * This module is runned first after requiring the file path and util configs.
 */
var program		= require('commander');
var remoteDB 	= false;

/**
 * @function processArg
 * @parent Parser
 * This function is run on first run of the app. 
 * It processes any flags that are set and runs the corresponding code called.
 */
var processArg = function() {
	program
		.option('-p, --production', 'set production environment')
		.option('-r, --remote', 'set dbconfig to remote db')
		.option('-l, --local', 'set dbconfig to local db')
		.parse(process.argv);

	console.log('//===============');
	if(program.production) {
		console.log('setting env to production');
		process.env.NODE_ENV = 'prod';	
	} else {
		if(!process.env.NODE_ENV) {
			process.env.NODE_ENV = 'local';
		}
		console.log('using ' + process.env.NODE_ENV + ' environment');
		// process.env.NODE_ENV = 'dev';
	}
	if(program.remote) {
		console.log('connecting to remote db');
		remoteDB = true;
	} else {
		console.log('connecting to local db');
		remoteDB = false;
	}
};

module.exports.processArg = processArg;
module.exports.getRemoteDB = function() {
	return remoteDB;
};