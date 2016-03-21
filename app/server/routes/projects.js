/**
 * @module projectApi
 * @parent VUMIX
 * This is the api for user projects  
 */
var file_paths   = require('../config/file_path'),
    utils       = require('../modules/utils'),
    unity       = require('../modules/unity'),
    models      = require('../models'),
    express     = require('express'),
    multer      = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, file_paths.storage_path);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    } 
});

var router = express.Router({mergeParams: true});
var upload = multer({ storage: storage });

/**
 * @module fetchAllProjects
 * @parent projectApi
 * Returns all projects of user with {userid}
 * GET
 * api: /api/users/{userId}/projects
 */
router.get('/', function(req, res) {
    models.project.findAll({
        where: {
            uid: req.params.userId
        }
    }).then(function(projects){
        res.json({status: "ok", length: projects.length, data: projects});            
    });
});

/**
 * @module fetchOneProject
 * @parent projectApi
 * Returns one project with {id} of user with {userid}
 * GET
 * api: /api/users/{userId}/projects/{id}
 */
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

/**
 * @module insertProject
 * @parent projectApi
 * @param req.body.userId, req.body.name, req.body.company_name, req.body.marker_type, req.body.project_dat_file, req.body.assetbundle_id
 * create new project owned by user with {userId}
 * POST
 * api: /api/users/{userId}/projects
 */
router.post('/', upload.single('file'), function(req, res) {
    var newProj = {
        uid: req.params.userId,
        name: req.body.name,
        company_name: req.body.company_name,
        marker_type: req.body.marker_type
    };
    var vuforia_pkg = req.file;
    models.project.find({
        where: {
            uid: newProj.uid,
            name: newProj.name
        }
    }).then(function(project) {
        if(project) {
            res.json({status: "fail", message: "project already exists!", length: 0, data: [project]});
        } else {
            models.project.create(newProj).then(function() {
                models.project.find({
                    where: {
                        uid: newProj.uid,
                        name: newProj.name
                    }
                }).then(function(newproject) {
                    var project_path = file_paths.storage_path+newproject.uid+'/unity/'+newproject.id+'/';
                    utils.checkExistsIfNotCreate(project_path);
                    // unity.createProj(newproject.uid, newproject.id);
                    // TODO: move vuforia package
                    // utils.moveFileToDest(vuforia_pkg, project_path+file_paths.vuforia);
                    res.json({status: "ok", message: "new project created!", length: 1, data: [newproject]});
                    // TODO: run reimport script function
                    // unity.rebuildPackage(newproject.uid, newproject.id);
                });         
            });            
        }
    });
});

/**
 * @module deleteProject
 * @parent projectApi
 * Delete project with {id} owned by user with {userId}
 * DELETE
 * api: /api/users/{userId}/projects/{id}
 */
router.delete('/:id', function(req, res) {
    var uid = req.params.userId;
    var id  = req.params.id;
    models.project.findById(id).then(function(project) {
        if(project) {
            models.project.destroy({
                where: {
                    id: id
                }
            }).then(function(row_deleted) {
                // TODO: delete project files
                res.json({status: "ok", message: "deleted " + row_deleted + " row(s)", length: 1, data: [project]});        
            });
        } else {
            res.json({status: "fail", message: "project not found", length: 0, data: []});
        }
    });
});

/**
 * @module updateProject
 * @parent projectApi
 * @param req.body.name, req.body.company_name, req.body.marker_type, req.body.project_dat_file, req.body.assetbundle_id, req.body.last_published
 * update project with {id} owned by user with {userId}
 * PUT
 * api: /api/users/{userId}/projects/{id}
 */
router.put('/:id', function(req, res) {
    var uid = req.params.userId;
    var id  = req.params.id;
    models.project.findById(uid).then(function(project) {
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
                    id: id,
                    uid: uid
                }
            }).then(function() {
                models.project.findById(id).then(function(updatedProject) {
                     res.json({status: "ok", message: "updated project", length: 1, data: [updatedProject]});
                });
            });
        } else {
            res.json({status: "fail", message: "project not found", length: 0, data: []});
        }
    });
});

module.exports = router;