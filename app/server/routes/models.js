/**
 * @module ModelsAPI
 * @parent Routes
 * @body
 * All model apis goes here
 * To use, require module from /server/routes/models    
 */
var file_paths  = require('../config/file_path'),
    auth        = require('./authentication'),
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
 * @module GET/api/users/:userId/models
 * @parent ModelsAPI
 * @body
 * GET Returns all models of user with {userid}
 */
router.get('/', auth.isLoggedIn, function(req, res) {
    models.model.findAll({
        where: {
            uid: req.params.userId
        }
    }).then(function(models){
        res.json({status: "ok", length: models.length, data: models});            
    }).catch(function(err) {
        console.log('caught error in fetch all models API');
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

/**
 * @module GET/api/users/:userId/models/:id
 * @parent ModelsAPI
 * @body
 * GET Returns one model with {id} of user with {userid}
 */
router.get('/:id', auth.isLoggedIn, function(req, res) {
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
    }).catch(function(err) {
        console.log('caught error in fetch model API');
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

/**
 * @module POST/api/users/:userId/models
 * @parent ModelsAPI
 * @param req.body.model_name
 * name of the mode
 * @param req.file
 * model file
 * @param req.body.file_extension
 * extension of the model
 * @body
 * POST create new model owned by user with {userId}
 */
router.post('/', auth.isLoggedIn, upload.single("file"), function(req, res) {
    console.log('uploading model...');
    var physical_model = req.file;
    var ext = req.body.file_extension;
    var modelName = req.body.model_name; 
    var destName = modelName+'.'+ext;
    var newModel = {
        uid: req.params.userId,
        name: modelName,
        file_name: destName,
        file_size: physical_model.size,
        file_extension: ext
    };
    models.model.find({
        where: {
            uid: newModel.uid,
            name: newModel.name
        }
    }).then(function(model) {
        if(model) {
            res.json({status: "fail", message: "model already exists!", length: 0, data: []});
        } else {
            insertModelDB(newModel, physical_model, function(model) {
                console.log("successfully uploaded model!");
                res.json({status: "ok", message: "new model created!", length: 1, data: [model]});
            }, function(err) {
                res.json({status: "fail", message: err.message, length: 0, data: []});
            });
        }
    }).catch(function(err) {
        console.log('caught error in insert model API');
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });            
});

var insertModelDB = function(newModel, physical_model, goodCallback, badCallback) {
    models.model.create(newModel).then(function() {
        return models.model.find({
            where: {
                uid: newModel.uid,
                name: newModel.name,
                file_name: newModel.file_name
            }
        });
    }).then(function(model) {
        unity.moveModel(model.uid, physical_model.originalname, newModel.file_name);
        goodCallback(model);
    }).catch(function(err) {
        console.log('Caught error in insert model DB API');
        console.log(err);
        badCallback(err);
    });
};

/**
 * @module DELETE/api/users/:userId/models/:id
 * @parent ModelsAPI
 * @body
 * DELETE Delete model with {id} owned by user with {userId}
 */
router.delete('/:id', auth.isLoggedIn, function(req, res) {
    var uid = req.params.userId;
    var modelName = '';
    var model;
    models.model.findById(req.params.id).then(function(_model) {
        if(!_model) {
            res.json({status: "fail", message: "model not found", length: 0, data: []});    
        } else {
            model = _model;
            modelName = _model.file_name;
            deleteModelDB(req.params.id, uid, modelName, model, function(row_deleted) {
                res.json({status: "ok", message: "deleted " + row_deleted + " row(s)", length: 1, data: [model]});        
            }, function(err) {
                res.json({status: "fail", message: err.message, length: 0, data: []});
            });
        }
    }).catch(function(err) {
        console.log('caught error in delete model API');
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

var deleteModelDB = function(id, uid, modelName, model, goodCallback, badCallback) {
    models.model.destroy({
        where: {
            id: id
        }
    }).then(function(row_deleted) {
        unity.deleteModel(uid, modelName);
        goodCallback(row_deleted, model);
    }).catch(function(err) {
        console.log('caught error in delete model DB API');
        badCallback(err);
    });
};

/**
 * @module PUT/api/users/:userId/models
 * @parent ModelsAPI
 * @param req.body.model_name
 * name of the mode
 * @param req.file
 * model file
 * @param req.body.file_extension
 * extension of the model
 * @body
 * PUT update model with {id} owned by user with {userId}
 */
router.put('/:id', auth.isLoggedIn, upload.single("file"), function(req, res) {
    console.log("uploading model");
    var id = req.params.id;
    var uid = req.params.userId;
    var physical_model = req.file;

    models.model.findById(id).then(function(model) {
        if(model) {
            updateModelDB(req, physical_model, id, model, function(updatedModel) {
                res.json({status: "ok", message: "updated model", length: 1, data: [updatedModel]});
                
                if(physical_model) {
                    unity.moveModel(uid, physical_model.filename, updatedModel.file_name);
                    if (physical_model.filename!=updatedModel.file_name) {
                        unity.deleteModel(uid, model.file_name);    
                    }
                }
            }, function(err) {
                res.json({status: "fail", message: err.message, length: 0, data: []});                
            });
        } else {
            res.json({status: "fail", message: "model not found", length: 0, data: []});
        }
    }).catch(function(err) {
        console.log('caught error in updateModelDB API');
        console.log(err.message);
        res.json({status: "fail", message: err.message, length: 0, data: []});
    });
});

var updateModelDB = function(req, physical_model, id, model, goodCallback, badCallback) {
    var ext = req.body.file_extension;
    var modelName = req.body.model_name;
    var destName = modelName+'.'+ext;
    models.model.update({
        name: modelName || model.name,
        file_size: physical_model.size || model.file_size,
        file_name: destName || model.file_name,
        file_extension: ext || model.file_extension
    }, { 
        where: {
            id: id
        }
    }).then(function() {
        return models.model.findById(id).then(function(updatedModel) {
            console.log('successfully updated Model in DB');
            goodCallback(updatedModel);
        });
    }).catch(function(err) {
        console.log('caught error in updateModelDB API function');
        badCallback(err);
    });
};

module.exports = router;