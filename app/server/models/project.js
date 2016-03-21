/*jslint node: true */
"use strict";
// TODO: add vuforia package item
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
			// create: function(models) {
			//   Project.create({
			//       username: 'stella'x
			//   })
			// }
		}
	});
	return Project;
};