var	program	= require('commander');

var remoteDB = false;

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
}

module.exports.processArg = processArg;
module.exports.getRemoteDB = function() {
	return remoteDB;
}