/**
 * @module modelApi
 * @parent VUMIX
 * This is the api for user models  
 */
var file_paths  = require('../config/file_path'),
    utils       = require('../modules/utils'),
    unity       = require('../modules/unity'),
    models      = require('../models'),
    express     = require('express'),
    multer      = require('multer'),
    path        = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../'+file_paths.storage_path));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    } 
});

var router = express.Router({mergeParams: true});
var upload = multer({ storage: storage });

/**
 * @module fetchAllModels
 * @parent modelApi
 * Returns all models of user with {userid}
 * GET
 * api: /api/users/{userId}/models
 */
router.get('/', function(req, res) {
    models.model.findAll({
        where: {
            uid: req.params.userId
        }
    }).then(function(models){
        res.json({status: "ok", length: models.length, data: models});            
    });
});

/**
 * @module fetchOneModel
 * @parent modelApi
 * Returns one model with {id} of user with {userid}
 * GET
 * api: /api/users/{userId}/models/{id}
 */
router.get('/:id', function(req, res) {
    models.model.find({
        where: {
            uid: req.params.userId,
            id: req.params.id
        }
    }).then(function(model) {
        if(model) {
            res.json({status: "ok", length: 1, data: [model]});
        } else {
            res.json({status: "fail", message: "model not found", length: 0, data: []});
        }
    });
});

/**
 * @module insertModel
 * @parent modelApi
 * @param req.body.userId, req.body.name, req.body.file_size, req.body.file_extension, req.body.file_location
 * create new model owned by user with {userId}
 * POST
 * api: /api/users/{userId}/models
 */
router.post('/', upload.single("file"), function(req, res) {
    console.log('uploading model...');
    var physical_model = req.file;
    var newModel = {
        uid: req.params.userId,
        name: req.body.model_name,
        file_name: physical_model.filename,
        file_size: physical_model.size,
        file_extension: physical_model.filename.split('.')[1]
    };
    console.log('uploading file:');
    // TODO: remove this
    // unity.moveModel(newModel.uid, physical_model.filename);    
    models.model.find({
        where: {
            uid: newModel.uid,
            name: newModel.name
        }
    }).then(function(model) {
        if(model) {
            res.json({status: "fail", message: "model already exists!", length: 0, data: []});
        }
        return models.model.create(newModel);
    }).then(function() {
        return models.model.find({
            where: {
                uid: newModel.uid,
                name: newModel.name,
                file_name: physical_model.filename 
            }
        });
    }).then(function(model){
            unity.moveModel(model.uid, physical_model.filename);
            res.json({status: "ok", message: "new model created!", length: 1, data: [model]});
    }).catch(function(err) {
        console.log(err);
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });            
});

/**
 * @module deleteModel
 * @parent modelApi
 * Delete model with {id} owned by user with {userId}
 * DELETE
 * api: /api/users/{userId}/models/{id}
 */
router.delete('/:id', function(req, res) {
    var uid = req.params.userId;
    var modelName = '';
    models.model.findById(req.params.id).then(function(model) {
        if(model) {
            modelName = model.file_name;
            models.model.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(row_deleted) {
                unity.deleteModel(model.uid, modelName);
                res.json({status: "ok", message: "deleted " + row_deleted + " row(s)", length: 1, data: [model]});        
            });
        }
        res.json({status: "fail", message: "model not found", length: 0, data: []});
    });
});

/**
 * @module updateModel
 * @parent modelApi
 * @param req.body.name, req.body.file_size, req.body.file_extension
 * update model with {id} owned by user with {userId}
 * PUT
 * api: /api/users/{userId}/models/{id}
 */
router.put('/:id', function(req, res) {
    models.model.findById(req.params.id).then(function(model) {
        if(model) {
            models.model.update({
                name: req.body.name || model.name,
                file_size: req.body.file_size || model.file_size,
                // file_name: physical_model.filename || model.file_name,
                file_extension: req.body.file_extension || model.file_extension
            }, { 
                where: {
                    id: req.params.id
                }
            }).then(function() {
                models.model.findById(req.params.id).then(function(updatedModel) {
                    res.json({status: "ok", message: "updated model", length: 1, data: [updatedModel]});
                });
            });
        } else {
            res.json({status: "fail", message: "model not found", length: 0, data: []});
        }
    });
});

module.exports = router;