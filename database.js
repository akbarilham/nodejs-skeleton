const Sequelize = require('sequelize')
const fs = require('fs')
const toml = require('toml')
const dbConfig = toml.parse(fs.readFileSync('config/database.toml', 'utf-8'))

const sequelize = new Sequelize(dbConfig.DB_SCHEMA, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
	host: dbConfig.DB_HOST,
	port: dbConfig.DB_PORT,
	dialect: dbConfig.DB_CONNECTION,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
	define: {
        freezeTableName: true
    }
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	})

var database = {}

database.sequelize = sequelize
database.Sequelize = Sequelize

module.exports = database