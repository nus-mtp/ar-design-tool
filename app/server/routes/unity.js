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

router.post('/users/:uid/projects/:pid/uploadstate', upload.single('binary'), function(req, res, next) {
    console.log('saving state.dat file');
    var uid = req.params.uid;
    var pid = req.params.pid;
    var stateDat = req.file;
    unity.copyStateDat(uid, pid, function() {
        unity.moveStateFile(uid, pid, stateDat, function() {
            console.log("Save state.dat ok");
            res.json({ status:"ok", message: "saved state dat file", data: [stateDat]});
        }, function(err) {
            console.log("Caught error in saving state dat..");
            console.log(err.message);
            res.json({ status:"fail", message: err.message, data: [err]});
        });
    }, function(err) {
        res.json({ status:"fail", message: err.message, data: [err]});
    });
});

router.post('/saveproject', function(req, res) {
    console.log('saving json state file');
    unity.saveStateJson(req.body.uid, req.body.pid, req.body.json, function() {
        console.log('save state json file ok');
        res.json({ status: "ok", message: "saved state json", data: [stateJson]});    
    }, function (err) {
        console.log('Error while saving state json file');
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

router.get('/users/:uid/projects/:pid/buildproject', function(req, res, next) {
    unity.buildApk(req.params.uid, req.params.pid, function(down_path) {
        console.log("down path is: " + down_path);
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