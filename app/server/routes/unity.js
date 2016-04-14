var file_paths  = require('../config/file_path'),
    unity       = require('../modules/unity');
    
var express = require('express'),
    multer  = require('multer'),
    path    = require('path');

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

router.post('/uploadstate', upload.single('binary'), function(req, res, next) {
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
    unity.moveStateFile(req.body.uid, req.body.pid, stateJson, function() {
        res.json({ status: "ok", message: "saved state json", data: [stateJson]});    
    }, function (err) {
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

router.post('/buildproject', function(req, res, next) {
    var pid = req.body.pid;
    var uid = req.body.uid;

    unity.buildApk(uid, pid, function(down_path) {
        res.download(down_path);
    }, function (err) {
        console.log("caught error in buildapk");
        res.json({status: "fail", message: err.message, length: 0, data: []});
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