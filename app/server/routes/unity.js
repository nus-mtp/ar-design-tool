var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var router = express.Router();

//settings for storing the saved file
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/');
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	} 
});

var upload = multer({ storage:storage });

router.post('/uploadstate.php', upload.single('binary'), function(req, res, next) {
	res.json({ status:"ok", data:req.file });
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

// router.post('/saveproject', )

module.exports = router;