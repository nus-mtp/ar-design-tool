var stubApi = require('../config/stubApi'),
    models  = require('../models'),
    express = require('express');

var router = express.Router({mergeParams: true});

// fetchAll
// GET
// api: /api/users/{userId}/models
router.get('/', function(req, res) {
    models.model.findAll({
        where: {
            uid: req.params.userId
        }
    }).then(function(models){
        res.json({status: "ok", length: models.length, data: models});            
    });
});

// fetchOne
// GET
// api: /api/users/{userId}/models/{id}
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

// insert
// POST
// api: /api/users/{userId}/models
// required body param: name
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

// delete
// DELETE
// api: /api/users/{userId}/models/{id}
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

// edit
// PUT
// api: /api/users/{userId}/models/{id}
// body param: name
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