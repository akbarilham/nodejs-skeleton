const fs = require('fs')
const toml = require('toml')
const tableConfig = toml.parse(fs.readFileSync('config/table.toml', 'utf-8'))

const sequelize = require("./database").sequelize
const Sequelize = require('sequelize')
var tableName = tableConfig.TableName

var model = (function(){

	var Example = sequelize.define(tableName, {
	    view_time: {
	    	type: Sequelize.DATE,
	    	unique: true,
	    	allowNull: false
	    },
	    url: {
	    	type: Sequelize.STRING,
	    	unique: true,
	    	allowNull: true
	    },
	    user_agent: {
	    	type: Sequelize.STRING,
	    	unique: true,
	    	allowNull: false
	    },
	    referrer: {
	    	type: Sequelize.STRING,
	    	unique: true,
	    	allowNull: false
	    },
	    device_type: {
	    	type: Sequelize.INTEGER,
	    	unique: true,
	    	allowNull: false
		}
	},{
		createdAt: tableConfig.CreatedAt,
		updatedAt: tableConfig.UpdatedAt,
		deletedAt: tableConfig.DeletedAt,
		timestamps: true,
		paranoid: true
	})

	return {
		Example
	}

})()

module.exports = model