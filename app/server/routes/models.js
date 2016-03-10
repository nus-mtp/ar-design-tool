/**
 * @module modelApi
 * @parent VUMIX
 * This is the api for user models  
 */
var models  = require('../models'),
    express = require('express');

var router = express.Router({mergeParams: true});

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
router.post('/', function(req, res) {
    var newModel = {
        uid: req.params.userId,
        name: req.body.name,
        file_size: req.body.file_size,
        file_extension: req.body.file_extension,
        file_location: req.body.file_location
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
            models.model.create(newModel).then(function() {
                res.json({status: "ok", message: "new model created!", length: 1, data: [newModel]});
            });            
        }
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
    models.model.findById(req.params.id).then(function(model) {
        if(model) {
            models.model.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(row_deleted) {
                res.json({status: "ok", message: "deleted " + row_deleted + " row(s)", length: 1, data: [model]});        
            });
        } else {
            res.json({status: "fail", message: "model not found", length: 0, data: []});
        }
    });
});

/**
 * @module updateModel
 * @parent modelApi
 * @param req.body.name, req.body.file_size, req.body.file_extension, req.body.file_location
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
                file_extension: req.body.file_extension || model.file_extension,
                file_location: req.body.file_location || model.file_location
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