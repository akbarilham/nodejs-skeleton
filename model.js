const fs = require('fs')
const toml = require('toml')
const tableConfig = toml.parse(fs.readFileSync('config/table.toml', 'utf-8'))

const sequelize = require("./database").sequelize
const Sequelize = require('sequelize')
var tableName = tableConfig.TABLENAME

var model = (function(){

	var example = sequelize.define(tableName, {
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
		createdAt: tableConfig.CREATEDAT,
		updatedAt: tableConfig.UPDATEAT,
		deletedAt: tableConfig.DELETEDAT,
		timestamps: true,
		paranoid: true
	})

	return {
		example
	}

})()

module.exports = model