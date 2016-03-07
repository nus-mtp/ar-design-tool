var express = require('express');
var multer = require('multer');
var fs = require('fs');

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

module.exports = router;