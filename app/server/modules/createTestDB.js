var models  = require('../models');

var insertGoogleUsers = function() {
	models.sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('1', 'Jeffrey', 'iamtoken1', 'wawa1@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
		models.sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('2', 'John', 'iamtoken2', 'wawa2@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
			models.sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('3', 'Michelle', 'iamtoken3', 'wawa3@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
				models.sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('4', 'Stella', 'iamtoken4', 'wawa4@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
					models.sequelize.query("INSERT INTO googleusers (id, name, token, email, createdAt, updateTimestamp) VALUES ('5', 'WZ', 'iamtoken5', 'wawa5@wawa.com', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
						// Results will be an empty array and metadata will contain the number of affected rows.
						console.log('created users');
					});
				});
			});
		});	
	});	
};
var insertProjects = function() {
	models.sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('1', '1', 'Vumix', 'NUS', '2D', 'location1', '1', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
		models.sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('2', '2', 'Vuforia', 'NUS', '3D', 'location2', '2', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
			models.sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('3', '2', 'Vuforia', 'NUS', '3D', 'location3', '3', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
				models.sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('4', '3', 'Vumix', 'NUS', '5D', 'location4', '4', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
					// Results will be an empty array and metadata will contain the number of affected rows.
					console.log('created projects');
				});
			});
		});	
	});	
};
var insertModels = function() {
	models.sequelize.query("INSERT INTO model (id, uid, name, file_size, file_extension, file_location, createdAt, updateTimestamp) VALUES ('1', '1', 'Orange', 256, '3ds','models/orange.3ds', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
		models.sequelize.query("INSERT INTO model (id, uid, name, file_size, file_extension, file_location, createdAt, updateTimestamp) VALUES ('2', '2', 'Apple', 226, '3ds','models/apple.3ds', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
			models.sequelize.query("INSERT INTO model (id, uid, name, file_size, file_extension, file_location, createdAt, updateTimestamp) VALUES ('3', '1', 'Grape', 2, '3ds','models/grape.3ds', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
				// Results will be an empty array and metadata will contain the number of affected rows.
				console.log('created models');
			});
		});	
	});	
};

module.exports.createTestDB = function() {
	console.log('creating test db entries');
	insertGoogleUsers();
	insertProjects();
	insertModels();
	console.log('finished creating test entries');
};