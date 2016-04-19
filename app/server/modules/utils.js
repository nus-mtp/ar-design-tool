/**
 * @module utils
 * @parent Modules
 * This utils module includes functions that are available for i/o
 * To use, require module from /server/modules/utils    
 */
var jsonfile = require('jsonfile'),
	rimraf 	= require('rimraf'),
	fs 		= require('fs');

/**
 * @function checkExistsIfNotCreate
 * @parent utils
 * @param {String} dirpath 
 * dirpath is the path that you want to check and maybe created
 * @param {function} callback
 * if callback() exists, it will be run at the end of the function. 
 * @body 
 * Checks whether dirpath exists, if it does not, it will create the path
 * Once operation is done, it will run callback();
 */
var checkExistsIfNotCreate = function(dirpath, callback) {
	var dirs 	= dirpath.split('\\');	
	var newdir 	= "";
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
	if(callback)
		callback();
};

/**
 * @function moveFileToDest
 * @parent utils
 * @param {String} location 
 * location is the original path of the file
 * @param {String} destination 
 * destination is the destination path to move the file to
 * @param {function} callback 
 * callback() is called if exits after moving is completed
 * @param {function} badcall
 * badcall() is called if exists when an error occurs while moving file
 * @body
 * Moves a file from location to destination. 
 */
var moveFileToDest = function(location, destination, callback, badcall) {
	console.log('location: ' + location);
	console.log('destination: ' + destination);
	fs.rename(location, destination, function(err) {
		if(err) {
			console.log(err);
			if(badcall) 
				badcall(err);
		} else {
			console.log('Successfully moved file from ' + location + ' to ' + destination);
			if(callback)
				callback();
		}
	});
};

/**
 * @function copyFile
 * @parent utils
 * @param {String} file 
 * file is the path to the file that is to be copied
 * @param {String} dest 
 * dest is the destination path to copy the file to
 * @param {function} goodcallback 
 * goodcallback() is called if exits after moving is completed
 * @param {function} badcallback
 * badcallback() is called if exists when an error occurs while moving file
 * @body
 * Copies a file from the location file to location dest. 
 */
var copyFile = function(file, dest, goodcallback, badcallback) {
	try {
		var readModel = fs.createReadStream(file);
		var writeModel = fs.createWriteStream(dest);

		readModel.pipe(writeModel, {end: false});
		readModel.on('end', function() {
			console.log('Finished copying model to '+dest);
			writeModel.end();
			if(goodcallback)
				goodcallback();
		});
	} catch(e) {
		console.log("error while copying files: " + file + " to dest: " + dest);
		console.log(e);
		if(badcallback)
			badcallback(e);
	}
};

/**
 * @function deleteDir
 * @parent utils
 * @param {String} deleteDest 
 * deleteDest is the location path of a directory to be deleted
 * @body
 * Deletes a directoy location given to the function.   
 */
var deleteDir = function(deleteDest) {
	rimraf(deleteDest, function(err) {
		if(err) {
			console.log(err);
		}
		else {
			console.log('Successfully deleted: ' + deleteDest);
		}
	});
};

/**
 * @function deleteFile
 * @parent utils
 * @param {String} deleteFile 
 * deleteFile is the path to the file that is to be deleted
 * @param {function} goodCall 
 * goodCall() will be called after deleting the file if exists.
 * @param {function} badCall 
 * badCall() will be called if it exists and if an error occurs while deleting the file
 * @body
 * Deletes a file at deleteFile location. 
 */
var deleteFile = function(deleteFile, goodCall, badCall) {
	fs.unlink(deleteFile, function(err) {
		if(err) {
			console.log(err);
			if (badCall) 
				badCall(err);
		} else {
			console.log('Successfully deleted: ' + deleteFile);
			if (goodCall)
				goodCall();
		}
	});
};

/**
 * @function writeJson
 * @parent utils
 * @param {String} dest 
 * dest is the path to save the json obj
 * @param {JSON} json 
 * json is the json object to be written as a JSON file
 * @param {function} goodcall
 * goodcall() is called after saving is completed
 * @param {function} badcall
 * badcall() is called when an error occurs while saving the JSON file
 * @body
 * writes a JSON object into a JSON obj to destination dest path. . 
 */
var writeJson = function(dest, json, goodcall, badcall) {
	jsonfile.writeFile(dest, json, function(err) {
		if(err) {
			badcall(err);
		} else {
			goodcall();
		}
	});
};

module.exports.checkExistsIfNotCreate = checkExistsIfNotCreate;
module.exports.moveFileToDest = moveFileToDest;
module.exports.deleteFile = deleteFile;
module.exports.deleteDir = deleteDir;
module.exports.writeJson = writeJson;
module.exports.copyFile = copyFile;