var expect      = require('chai').expect,
    app         = require('../../vumix'),
    supertest   = require('supertest');
    
var api = supertest(app);


// Webserver Routing
describe('App Routing', function() {
    describe('call login page', function() {
        it('should return with ok stauts', function(done) {
            api
                .get('/login')
                .expect(200)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                }); 
        });
    });
    // describe('call index page', function() {
    //     it('should redirect to login page', function(done) {
    //         api
    //             .get('/')
    //             .expect(302)
    //             .end(function(err, res) {
    //                 expect(res.statusCode).to.equal(302);
    //                 expect(res.headers.location).to.equal('/login');
    //                 done();
    //             });
    //     });
    // });
    describe('call logout', function() {
        it('should redirect to index', function(done) {
            api
                .get('/logout')
                .expect(302)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(302);
                    expect(res.headers.location).to.equal('/');
                    done();
                });
        });
    });
    // describe('call editor', function() {
    //     it('should return the editor view', function(done) {
    //         api
    //             .get('/project/1')
    //             .expect(200)
    //             .end(function(err, res) {
    //                 expect(res.statusCode).to.equal(200);
    //                 done();
    //             });
    //     });
    // });
});