// This file contains the stub output of the api
// Delete this file when api is connected to the database

var users = [
    {
        "id": 1,
        "name": "Jeffrey",
        "email": "wawa1@wawa.com"
    },
    {
        "id": 2,
        "name": "John",
        "email": "wawa2@wawa.com"
    },
    {
        "id": 3,
        "name": "Michael",
        "email": "wawa3@wawa.com"
    },
    {
        "id": 4,
        "name": "Stella",
        "email": "wawa4@wawa.com"
    },
    {
        "id": 5,
        "name": "WZ",
        "email": "wawa5@wawa.com"
    }
];

var projects = [
    {
        "id": 1,
        "userId": 1,
        "name": "Vumix"
    },
    {
        "id": 2,
        "userId": 1,
        "name": "Vuforia"
    },
    {
        "id": 3,
        "userId": 2,
        "name": "Vumix"
    }
];

var models = [
    {
        "id": 1,
        "userId": 1,
        "name": "Orange"
    },
    {
        "id": 2,
        "userId": 1,
        "name": "Apple"
    },
    {
        "id": 3,
        "userId": 2,
        "name": "Grape"
    }
];

module.exports.users = users;
module.exports.projects = projects;
module.exports.models = models;