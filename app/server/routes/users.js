/**
 * @module userApi
 * @parent VUMIX
 * This is the api for users 
 */
var stubApi = require('../config/stubApi'),
    models  = require('../models'),
    express = require('express');

var router = express.Router();

/**
 * @module fetchAllUsers
 * @parent userApi
 * Returns all users registered with the system
 * GET
 * api: /api/users
 */
router.get('/', function(req, res) {
    models.googleUser.findAll().then(function(users){
        res.json({status: "ok", length: users.length, data: users});            
    });
});

/**
 * @module fetchOneUser
 * @parent userApi
 * Returns one user with {id} registered with the system
 * GET
 * api: /api/users/{id}
 */
router.get('/:id', function(req, res) {
    models.googleUser.findById(req.params.id).then(function(user) {
        if(user) {
            res.json({status: "ok", length: 1, data: [user]});
        } else {
            res.json({status: "fail", message: "user not found", length: 0, data: []});
        }
    });
});

/**
 * @module insertUser
 * @parent userApi
 * @param req.body.id, req.body.name, req.body.token, req.body.email
 * create new user
 * POST
 * api: /api/users
 */
router.post('/', function(req, res) {
    var newUser = {
        id: '2',
        name: req.body.name,
        token: '123123123123',
        email: req.body.email
    };
    models.googleUser.find({
        where: {
            token: newUser.token
        }
    }).then(function(user) {
        if(user) {
            res.json({status: "fail", message: "user already exists!", length: 0, data: []});
        } else {
            models.googleUser.create(newUser).then(function() {
                res.json({status: "ok", message: "new user created!", length: 1, data: [newUser]});
            });            
        }
    });
});

/**
 * @module deleteUser
 * @parent userApi
 * Delete user with {id}
 * DELETE
 * api: /api/users/{id}
 */
router.delete('/:id', function(req, res) {
    models.googleUser.findById(req.params.id).then(function(user) {
        if(user) {
            models.googleUser.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(row_deleted) {
                res.json({status: "ok", message: "deleted " + row_deleted + " row(s)", length: 1, data: [user]});        
            });
        } else {
            res.json({status: "fail", message: "user not found", length: 0, data: []});
        }
    });
});

/**
 * @module updateUser
 * @parent userApi
 * @param req.body.name, req.body.email
 * update user with {id}
 * PUT
 * api: /api/users/{id}
 */
router.put('/:id', function(req, res) {
    models.googleUser.findById(req.params.id).then(function(user) {
        if(user) {
            models.googleUser.update({
                name: req.body.name || user.name,
                email: req.body.email || user.email    
            }, { 
                where: {
                    id: req.params.id
                }
            }).then(function() {
                models.googleUser.findById(req.params.id).then(function(updatedUser) {
                     res.json({status: "ok", message: "updated user", length: 1, data: [updatedUser]});
                });
            });
        } else {
            res.json({status: "fail", message: "user not found", length: 0, data: []});
        }
    });
});

module.exports = router;