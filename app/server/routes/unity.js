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
    var uid = req.params.uid;
    var pid = req.params.pid;
    var stateDat = req.binary;
    unity.copyStateDat(uid, pid, stateDat, function() {
        unity.moveStateFile(uid, pid, stateDat);
        unity.moveCopyState(uid, pid);
        res.json({ status:"ok", message: "saved state dat file", data: [stateDat]});
    }).catch(function (err) {
        console.log("Caught error in uploadstate route");
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

router.post('/saveproject', upload.single('json'), function(req, res) {
    var stateJson = req.json;
    unity.moveStateFile(req.body.uid, req.body.pid, stateJson);
    res.json({ status: "ok", message: "saved state json", data: [req.json]});
});

router.get('/buildproject.php', function(req, res, next) {
    var unityPath = '"' + process.env['UNITY_HOME'] + '\\Unity.exe"';
    var mode = " -quit ";
    var projectPath = ' -projectPath "D:/workspace/cs3284/ar-design-tool/WZ_BACKEND/AssetBundle test" ';
    var buildMethod = ' -executeMethod  BuildProject.BuildAndroid2D ';
    var command = unityPath + mode + projectPath + buildMethod;
    exec(command, function(err, stdout, stderr) {  
    }).on('close', function(code) {
        var filePath = "../WZ_BACKEND/AssetBundle test/Assets/AndroidBuilds.apk";
        res.download(filePath);
    });
});

router.use(function(err, req, res, next) {
    if (err.status == 404) {
        res.statusCode = 404;
        res.send('Cannot find the file');
    } else {
        next(err);
    }
});

module.exports = router;