/**
 * @module user_api
 * @parent Vumix
 * This is the api for user models  
 */
var stubApi = require('../config/stubApi'),
    models  = require('../models'),
    express = require('express');

var router = express.Router();

// fetchAll
// GET
// api: /api/users
router.get('/', function(req, res) {
    //TODO: return all users in db
    res.json({status: "ok", length: stubApi.users.length, data: stubApi.users});
});

// fetchOne
// GET
// api: /api/users/{id}
router.get('/:id', function(req, res) {
    var user = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id) {
                index = i;
            } 
        });
        return index < 0 ? undefined : el[index];
        //TODO: change stubApi.users to check whether user exists
    })(stubApi.users);
    if (user) {
        //TODO: return instance of user
        res.json({status: "ok", length: 1, data: [user]});
    } else {
        res.json({status: "fail", message: "user is not found", length: 0, data: []});
    }
});

// insert
// POST
// api: /api/users
// required body param: name, email
router.post('/', function(req, res) {
    var user = {
        id: 99,
        name: req.body.name,
        email: req.body.email
    };
    //TODO: change stubAPI.users.push to create user in db
    stubApi.users.push(user);
    res.json({status: "ok", length: 1, data: [user]});
});

// delete
// DELETE
// api: /api/users/{id}
router.delete('/:id', function(req, res) {
    var user = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id) {
                index = i;                
            } 
        });
        return index < 0 ? undefined : el.splice(index,1)[0];   
        //TODO: change stubAPI.users to check whether user exists
    })(stubApi.users);
    if (user) {
        //TODO: delete user in db
        res.json({status: "ok", length: 1, data: [user]});
    } else {
        res.json({status: "fail", message: "user is not found", length: 0, data: []});
    }
});

// edit
// PUT
// api: /api/users/{id}
// body param: name, email
router.put('/:id', function(req, res) {
    var user = (function(el) {
        var index = -1;
        el.forEach(function(e,i) {
            if (e.id.toString() === req.params.id) {
                index = i;
            } 
        });
        return index < 0 ? undefined : el[index];
        //TODO: change stubAPI.users to check whether user exists
    })(stubApi.users);
    if (user) {
        //TODO: update existing user
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json({status: "ok", length: 1, data: [user]});
    } else {
        res.json({status: "fail", message: "user is not found", length: 0, data: []});
    }
});

module.exports = router;