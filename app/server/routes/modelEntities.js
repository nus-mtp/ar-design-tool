var stubApi = require('../config/stubApi'),
    models  = require('../models'),
    express = require('express');

var router = express.Router({mergeParams: true});

// fetchAll
// GET
// api: /api/projects/{projectId}/models
router.get('/', function(req, res) {
    var modelEntities = [];
    stubApi.modelEntities.forEach(function(e,i) {
       if (e.projectId.toString() === req.params.projectId) {
           modelEntities.push(e);
       } 
    });
    res.json({status: "ok", length: modelEntities.length, data: modelEntities});
});

// fetchOne
// GET
// api: /api/projects/{projectId}/models/{id}
router.get('/:id', function(req, res) {
    var modelEntities = [];
    stubApi.modelEntities.forEach(function(e,i) {
       if (e.projectId.toString() === req.params.projectId) {
           modelEntities.push(e);
       } 
    });
    var modelEntity = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id) {
                index = i;
            } 
        });
        return index < 0 ? undefined : el[index];
    })(modelEntities);
    if (modelEntity) {
        res.json({status: "ok", length: 1, data: [modelEntity]});
    } else {
        res.json({status: "fail", message: "model entity is not found", length: 0, data: []});
    }
});

// insert
// POST
// api:/api/projects/{projectId}/models
// required body param: name, modelId
router.post('/', function(req, res) {
    var modelEntity = {
        id: 99,
        projectId: req.params.userId,
        modelId: req.body.modelId,
        name: req.body.name,
        clickable: false
    };
    stubApi.modelEntities.push(modelEntity);
    res.json({status: "ok", length: 1, data: [modelEntity]});
});

// delete
// DELETE
// api: /api/projects/{projectId}/models/{id}
router.delete('/:id', function(req, res) {
    var modelEntity = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id && e.projectId.toString() === req.params.projectId) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el.splice(index,1)[0];
    })(stubApi.modelEntities);
    if (modelEntity) {
        res.json({status: "ok", length: 1, data: [modelEntity]});
    } else {
        res.json({status: "fail", message: "model entity is not found", length: 0, data: []});
    }
});

// edit
// PUT
// api: /api/projects/{projectId}/models/{id}
// body param: name, clickable
router.put('/:id', function(req, res) {
    var modelEntity = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id && e.projectId.toString() === req.params.projectId) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el[index];
    })(stubApi.modelEntities);
    if (modelEntity) {
        modelEntity.name = req.body.name || modelEntity.name;
        modelEntity.clickable = req.body.clickable != undefined ? req.body.clickable : modelEntity.clickable;
        res.json({status: "ok", length: 1, data: [modelEntity]});
    } else {
        res.json({status: "fail", message: "model entity is not found", length: 0, data: []});
    }
});

module.exports = router;