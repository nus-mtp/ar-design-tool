var expect      = require('chai').expect,
    app         = require('../../vumix'),
    fs          = require('fs'),
    supertest   = require('supertest');
    
var api = supertest(app);

// Upload State Test

// describe('uploadstate.php', function () {
  
<<<<<<< HEAD
  var testFieldName = "binary";
  var testFileName = "state_test.dat";
  var pathToCreatedTestData = 'public/' + testFileName;
  var pathToTestData = 'test/server/' + testFileName;
=======
//   var testFieldName = "binary";
//   var testFileName = "state_test.dat";
//   var pathToCreatedTestData = path.join(__dirname, '../../server/storage/'+testFileName);
//   var pathToTestData = path.join(__dirname, '../../test/server/'+testFileName);
>>>>>>> scss
  
//   it('should return 200 and save with originalname', function(done) {
//     api
//       .post('/uploadstate.php')
//       .attach(testFieldName, pathToTestData)
//       .expect(200)
//       .end(function(err, res) {        
//         expect(res.body.status).to.equal('ok');
//         expect(res.body.data.fieldname).to.equal(testFieldName);
//         expect(res.body.data.originalname).to.equal(testFileName);
//         done();        
//       });
//   });
  
//   after(function() {
//     fs.unlinkSync(pathToCreatedTestData);  
//   });
  
// });