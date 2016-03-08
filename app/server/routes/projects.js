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
    var newProj = {
        uid: req.params.userId,
        name: req.body.name,
        company_name: req.body.com,
        marker_type: req.body.marker,
        project_dat_file: req.body.dat,
        assetbundle_id: req.body.assetid
    };
    models.project.find({
        where: {
            uid: newProj.uid,
            name: newProj.name
        }
    }).then(function(project) {
        if(project) {
            res.json({status: "fail", message: "project already exists!", length: 0, data: []});
        } else {
            models.project.create(newProj).then(function() {
                res.json({status: "ok", message: "new project created!", length: 1, data: [newProj]});
            });            
        }
    });
});

// delete
// DELETE
// api: /api/users/{userId}/projects/{id}
router.delete('/:id', function(req, res) {
    models.project.findById(req.params.id).then(function(project) {
        if(project) {
            models.project.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(row_deleted) {
                res.json({status: "ok", message: "deleted " + row_deleted + " row(s)", length: 1, data: [project]});        
            });
        } else {
            res.json({status: "fail", message: "project not found", length: 0, data: []});
        }
    });
});

// edit
// PUT
// api: /api/users/{userId}/projects/{id}
// body param: name
router.put('/:id', function(req, res) {
    models.project.findById(req.params.id).then(function(project) {
        if(project) {
            models.project.update({
                name: req.body.name || project.name,
                company_name: req.body.company_name || project.company_name,
                marker_type: req.body.marker_type || project.marker_type,
                project_dat_file: req.body.project_dat_file || project.project_dat_file,
                assetbundle_id: req.body.assetbundle_id || project.assetbundle_id,
                last_published: req.body.last_published || project.last_published    
            }, { 
                where: {
                    id: req.params.id
                }
            }).then(function() {
                models.project.findById(req.params.id).then(function(updatedProject) {
                     res.json({status: "ok", message: "updated project", length: 1, data: [updatedProject]});
                });
            });
        } else {
            res.json({status: "fail", message: "project not found", length: 0, data: []});
        }
    });
});

module.exports = router;