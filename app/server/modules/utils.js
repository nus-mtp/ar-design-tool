var fs = require('fs');

var checkExistsIfNotCreate = function(dirpath) {
	var dirs 	= dirpath.split('/');	
	var newdir 	="";
	
	for(var i=0; i<dirs.length; i++) {
		newdir += dirs[i]+'/';
		try {
			fs.statSync(newdir);
		} catch(e) {
			try {
				fs.mkdirSync(newdir);
			} catch(e) {
				console.log(e);
				if (e.code == 'EEXIST') {
					console.log('path already exists');
				}
			}
		}
	}
}

module.exports.checkExistsIfNotCreate = checkExistsIfNotCreate;