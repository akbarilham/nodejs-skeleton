require('env2')('.env')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_CONNECTION,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
    define: {
        freezeTableName: true,
        timestamps: false
    },	
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