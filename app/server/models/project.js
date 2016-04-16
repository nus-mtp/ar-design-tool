/*jslint node: true */
/**
 * @module project
 * @parent Models
 * Project is the database model which stores the user's project metadata 
 */
"use strict";
module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define("project", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { 
			type: DataTypes.STRING,
			allowNull: false
		},
		company_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		marker_type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		project_dat_file: {
			type: DataTypes.STRING,
			allowNull: true
		},
		assetbundle_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		last_published: {
			type: DataTypes.DATE,
			allowNull: true
		},
		thumbnail_loc: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		timestamps: true,
		updatedAt: 'updateTimestamp',
		freezeTableName: true,
		classMethods: {
			insertTestProjects: function() {
				sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('1', '1', 'Vumix', 'NUS', '2D', 'location1', '1', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
					sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('2', '2', 'Vuforia', 'NUS', '3D', 'location2', '2', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
						sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('3', '2', 'Vuforia', 'NUS', '3D', 'location3', '3', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
							sequelize.query("INSERT INTO project (id, uid, name, company_name, marker_type, project_dat_file, assetbundle_id, createdAt, updateTimestamp) VALUES ('4', '3', 'Vumix', 'NUS', '5D', 'location4', '4', '2038-01-19 03:14:07.999999', '2038-01-19 03:14:07.999999')").spread(function(results, metadata) {
								// Results will be an empty array and metadata will contain the number of affected rows.
								console.log('created test projects into DB');
							});
						});
					});	
				});	
			}
			// create: function(models) {
			//   Project.create({
			//       username: 'stella'x
			//   })
			// }
		}
	});
	return Project;
};