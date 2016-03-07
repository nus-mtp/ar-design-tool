var expect      = require('chai').expect,
    app         = require('../../vumix'),
    supertest   = require('supertest');
    
var api = supertest(app);

// User API Test

describe('users APi', function () {
    describe('fetchAll', function() {
        it('should return with ok status', function(done) {
            api
            .get('/api/users')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
    });
    
    describe('fetchOne', function() {
        it('should return with ok status', function(done) {
            api
            .get('/api/users/1')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        });
        it('should return with fail status', function(done) {
            api
            .get('/api/users/10')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
    
    describe('delete', function() {
        it('should return with ok status', function(done) {
            api
            .delete('/api/users/2')
            .expect(200)
            .end(function(err, res) {
                console.log(res.body);
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with fail status', function(done) {
            api
            .delete('/api/users/2')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
    
    describe('create', function() {
        it('should return with ok status', function(done) {
            api
            .post('/api/users/')
            .send({
                name: 'John',
                email: 'wawa2@wawa.com'
            })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('John');
                expect(res.body.data[0].email).to.equal('wawa2@wawa.com');
                expect(res.body.status).to.equal('ok');
                done();
            })
        });
    });

    describe('edit', function() {
        it('should return with ok status with new value', function(done) {
            api
            .put('/api/users/1')
            .send({ name:'Jeff', email:'change@email.com' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('Jeff');
                expect(res.body.data[0].email).to.equal('change@email.com');
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with ok status with old value', function(done) {
            api
            .put('/api/users/1')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('Jeff');
                expect(res.body.data[0].email).to.equal('change@email.com');
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with fail status', function(done) {
            api
            .put('/api/users/9876')
            .send({ name:'Jeff', email:'change@email.com' })
            .expect(200)
            .end(function(err, res) {
                console.log(res.body)
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
});


// Project API Test

describe('projects APi', function () {
    describe('fetchAll', function() {
        it('should return with ok status', function(done) {
            api
            .get('/api/users/1/projects')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
    });
    
    describe('fetchOne', function() {
        it('should return with ok status', function(done) {
            api
            .get('/api/users/1/projects/1')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        });
        it('should return with fail status', function(done) {
            api
            .get('/api/users/1/projects/10')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
    
    describe('insert', function() {
        it('should return with ok status', function(done) {
            api
            .post('/api/users/1/projects')
            .send({ name:'New Project' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
    });
    
    describe('delete', function() {
        it('should return with ok status', function(done) {
            api
            .delete('/api/users/1/projects/2')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with ok status', function(done) {
            api
            .delete('/api/users/1/projects/2')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
    
    describe('edit', function() {
        it('should return with ok status with new value', function(done) {
            api
            .put('/api/users/1/projects/1')
            .send({ name:'Old Project' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('Old Project');
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with ok status with old value', function(done) {
            api
            .put('/api/users/1/projects/1')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('Old Project');
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with fail status', function(done) {
            api
            .put('/api/users/1/projects/2')
            .send({ name:'Old Project' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
});


// Model API Test

describe('models APi', function () {
    describe('fetchAll', function() {
        it('should return with ok status', function(done) {
            api
            .get('/api/users/1/models')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
    });
    
    describe('fetchOne', function() {
        it('should return with ok status', function(done) {
            api
            .get('/api/users/1/models/1')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        });
        it('should return with fail status', function(done) {
            api
            .get('/api/users/1/models/10')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
    
    describe('insert', function() {
        it('should return with ok status', function(done) {
            api
            .post('/api/users/1/models')
            .send({ name:'New Model' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
    });
    
    describe('delete', function() {
        it('should return with ok status', function(done) {
            api
            .delete('/api/users/1/models/2')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with fail status', function(done) {
            api
            .delete('/api/users/1/models/2')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
    
    describe('edit', function() {
        it('should return with ok status with new value', function(done) {
            api
            .put('/api/users/1/models/1')
            .send({ name:'Old Model' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('Old Model');
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with ok status with old value', function(done) {
            api
            .put('/api/users/1/models/1')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.data[0].name).to.equal('Old Model');
                expect(res.body.status).to.equal('ok');
                done();
            });
        }); 
        it('should return with fail status', function(done) {
            api
            .put('/api/users/1/models/2')
            .send({ name:'Old Model' })
            .expect(200)
            .end(function(err, res) {
                expect(res.body.status).to.equal('fail');
                done();
            });
        }); 
    });
});
