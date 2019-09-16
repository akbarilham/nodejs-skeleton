const sequelize = require("./database").sequelize
const Sequelize = require('sequelize')
var tableName = 'coba'

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
	})

	return {
		Example
	}

})()

module.exports = model