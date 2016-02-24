var express = require('express'),
    stubApi = require('../config/stubApi');

var router = express.Router();

// fetchAll
// GET
// api: /api/users
router.get('/', function(req, res) {
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
    })(stubApi.users);
    if (user) {
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
    })(stubApi.users);
    if (user) {
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
    })(stubApi.users);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json({status: "ok", length: 1, data: [user]});
    } else {
        res.json({status: "fail", message: "user is not found", length: 0, data: []});
    }
});

module.exports = router;