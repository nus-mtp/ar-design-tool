/**
 * @module UserAPI
 * @parent Routes
 * All user apis goes here
 * To use, require module from /server/routes/users
 */
var auth    = require('./authentication'),
    models  = require('../models'),
    express = require('express');

var router = express.Router();

/**
 * @module GET/api/users/
 * @parent UserAPI
 * @body
 * GET Returns all users registered with the system
 */
router.get('/', function(req, res) {
    models.googleUser.findAll().then(function(users){
        res.json({status: "ok", length: users.length, data: users});            
    });
});

/**
 * @module GET/api/users/:id
 * @parent UserAPI
 * @body
 * GET Returns one user with {id} registered with the system
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
 * @module POST/api/users/
 * @parent UserAPI
 * @param req.body.name
 * Name of user
 * @param req.body.email
 * Email of user
 * @param req.body.token
 * Token of user
 * @body
 * POST create new user. Used mainly for testing.
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
 * @module DELETE/api/users/:id
 * @parent UserAPI
 * @body
 * DELETE Delete user with {id}
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
 * @module PUT/api/users/:id
 * @parent UserAPI
 * @param req.body.name
 * Name of user
 * @param req.body.email
 * Email of user
 * @body
 * PUT update user with {id}
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