var stubApi = require('../config/stubApi'),
    models  = require('../models'),
    express = require('express');

var router = express.Router({mergeParams: true});

// fetchAll
// GET
// api: /api/users/{userId}/projects
router.get('/', function(req, res) {
    models.project.findAll({
        where: {
            uid: req.params.userId
        }
    }).then(function(projects){
        res.json({status: "ok", length: projects.length, data: projects});            
    });
});

// fetchOne
// GET
// api: /api/users/{userId}/projects/{id}
router.get('/:id', function(req, res) {
    models.project.find({
        where: {
            uid: req.params.userId,
            id: req.params.id
        }
    }).then(function(project) {
        if(project) {
            res.json({status: "ok", length: 1, data: [project]});
        } else {
            res.json({status: "fail", message: "project not found", length: 0, data: []});
        }
    });
});

// insert
// POST
// api: /api/users/{userId}/projects
// required body param: name
router.post('/', function(req, res) {
    //TODO: add project 
    var project = {
        id: 99,
        userId: req.params.userId,
        name: req.body.name
    };
    stubApi.projects.push(project);
    res.json({status: "ok", length: 1, data: [project]});
});

// delete
// DELETE
// api: /api/users/{userId}/projects/{id}
router.delete('/:id', function(req, res) {
    var project = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id && e.userId.toString() === req.params.userId) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el.splice(index,1)[0];
        //TODO: check whether project exists
    })(stubApi.projects);
    if (project) {
        //TODO: delete project
        res.json({status: "ok", length: 1, data: [project]});
    } else {
        res.json({status: "fail", message: "project is not found", length: 0, data: []});
    }
});

// edit
// PUT
// api: /api/users/{userId}/projects/{id}
// body param: name
router.put('/:id', function(req, res) {
    var project = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id && e.userId.toString() === req.params.userId) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el[index];
        //TODO: check whether project exists
    })(stubApi.projects);
    if (project) {
        //TODO: edit project 
        project.name = req.body.name || project.name;
        res.json({status: "ok", length: 1, data: [project]});
    } else {
        res.json({status: "fail", message: "project is not found", length: 0, data: []});
    }
});

module.exports = router;