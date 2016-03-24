var file_paths  = require('../config/file_path'),
    utils       = require('../modules/utils'),
    unity       = require('../modules/unity');
    
var express = require('express'),
    multer  = require('multer'),
    path    = require('path'),
    fs      = require('fs');

var exec = require('child_process').exec;

var router = express.Router();

//settings for storing the saved file
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(__dirname, '../../'+file_paths.storage_path));
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	} 
});

var upload = multer({ storage:storage });

router.post('/uploadstate.php', upload.single('binary'), function(req, res, next) {
	res.json({ status:"ok", data:req.file });
});

router.post('/saveproject', function(req, res) {
    res.json({ status: "ok", message: "saved state files"});
});

// TODO: change this eventually to build apk
router.post('/buildproject.php', function(req, res, next) {
    var unityPath = '"' + process.env['UNITY_HOME'] + '\\Unity.exe"';
    var mode = " -quit ";
    var projectPath = ' -projectPath "D:/workspace/cs3284/ar-design-tool/WZ_BACKEND/AssetBundle test" ';
    var buildMethod = ' -executeMethod  BuildProject.BuildAndroid2D ';
    var command = unityPath + mode + projectPath + buildMethod;
        exec(command, function(err, stdout, stderr) {  
    }).on('close', function(code) {
        var absolutePath = "D:/workspace/cs3284/ar-design-tool/WZ_BACKEND/AssetBundle test/Assets/AndroidBuilds.apk";
        res.download(absolutePath, 'android.apk');
    });
});

module.exports = router;