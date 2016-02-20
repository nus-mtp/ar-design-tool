var	program	= require('commander');

var processArg = function() {
	program
		.option('-p, --production', 'set production environment')
		.parse(process.argv);

	console.log('//===============');
	if(program.production) {
		console.log('setting env to production');
		process.env.NODE_ENV = 'prod';	
	} else {
		console.log('setting env to dev');
		process.env.NODE_ENV = 'dev';
	}
}

module.exports.processArg = processArg;