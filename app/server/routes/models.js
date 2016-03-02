var stubApi = require('../config/stubApi'),
    models  = require('../models'),
    express = require('express');

var router = express.Router({mergeParams: true});

// fetchAll
// GET
// api: /api/users/{userId}/models
router.get('/', function(req, res) {
    var models = [];
    stubApi.models.forEach(function(e,i) {
       if (e.userId.toString() === req.params.userId) {
           models.push(e);
       } 
    });
    res.json({status: "ok", length: models.length, data: models});
});

// fetchOne
// GET
// api: /api/users/{userId}/models/{id}
router.get('/:id', function(req, res) {
    var models = [];
    stubApi.models.forEach(function(e,i) {
       if (e.userId.toString() === req.params.userId) {
           models.push(e);
       } 
    });
    var model = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id) {
                index = i;
            } 
        });
        return index < 0 ? undefined : el[index];
    })(models);
    if (model) {
        res.json({status: "ok", length: 1, data: [model]});
    } else {
        res.json({status: "fail", message: "model is not found", length: 0, data: []});
    }
});

// insert
// POST
// api: /api/users/{userId}/models
// required body param: name
router.post('/', function(req, res) {
    var model = {
        id: 99,
        userId: req.params.userId,
        name: req.body.name
    };
    stubApi.models.push(model);
    res.json({status: "ok", length: 1, data: [model]});
});

// delete
// DELETE
// api: /api/users/{userId}/models/{id}
router.delete('/:id', function(req, res) {
    var model = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id && e.userId.toString() === req.params.userId) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el.splice(index,1)[0];
    })(stubApi.models);
    if (model) {
        res.json({status: "ok", length: 1, data: [model]});
    } else {
        res.json({status: "fail", message: "model is not found", length: 0, data: []});
    }
});

// edit
// PUT
// api: /api/users/{userId}/models/{id}
// body param: name
router.put('/:id', function(req, res) {
    var model = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id && e.userId.toString() === req.params.userId) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el[index];
    })(stubApi.models);
    if (model) {
        model.name = req.body.name || model.name;
        res.json({status: "ok", length: 1, data: [model]});
    } else {
        res.json({status: "fail", message: "model is not found", length: 0, data: []});
    }
});

module.exports = router;