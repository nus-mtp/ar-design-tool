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
};

var saveFileToDest = function(file, dest) {
	fs.writeFile(dest, file, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Saved file ' + dest);
		}
	});
};

var deleteFile = function(deleteDest) {
	fs.unlink(deleteDest, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successfully deleted ' + deleteDest);
		}
	});
};

module.exports.checkExistsIfNotCreate = checkExistsIfNotCreate;
module.exports.saveFileToDest = saveFileToDest;
module.exports.deleteFile = deleteFile;