require('env2')('.env')
const moment = require("moment")
const async = require('async')
const model = require("./model")

var controller = (function(){

	var Select = async function(request, response, next){
		try {
			var usershistories = await model.UsersHistories.findAll({})
			if (usershistories.length !== 0) {
				response.json({
					code: "200",
					message: "Success",
					data: usershistories
				})
			} else {
				response.json({
					code: "204",
					message: "Data empty",
					data: {}
				})
			}
		} catch (error) {
			response.json({
				code: "404",
				message: error.message,
				data: {}
			})
		}
	}

	var SelectById = async function(request, response, next){
		try {
			var usershistories = await model.UsersHistories.findOne({
				where: {id: request.body.id}
			})
			if (usershistories.length !== 0) {
				response.json({
					code: "200",
					message: "Success",
					data: usershistories
				})
			} else {
				response.json({
					code: "204",
					message: "Data empty",
					data: {}
				})
			}
		} catch (error) {
			response.json({
				code: "404",
				message: error.message,
				data: {}
			})
		}
	}

	var Insert = async function(request, response, next){
		try {
			var {
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			} = request.body
			var usershistories = await model.UsersHistories.create({
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			})
			if (usershistories) {
				response.json({
					code: "200",
					message: "Insert success",
					data: usershistories
				})
			}
		} catch (error) {
			response.json({
				code: "404",
				message: error.message,
				data: {}
			})
		}
	}

	var Update = async function(request, response, next){
		try {
			var usershistoriesID = request.body.id
			var {
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			} = request.body
			var usershistories = await model.UsersHistories.update({
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			},{
				where: {
					id: usershistoriesID
				}
			})
			if (usershistories) {
				response.json({
					code: "200",
					message: "Update success",
					data: usershistories
				})
			}
		} catch (error) {
			response.json({
				code: "404",
				message: error.message,
				data: {}
			})
		}
	}

	var Delete = function(request, response){
		try {
			var usershistoriesID = request.body.id
			var usershistories = await model.UsersHistories.destroy({
				where: {
					id: usershistoriesID
				}
			})
			if (usershistories) {
				response.json({
					code: "200",
					message: "Delete success",
					data: usershistories
				})
			}
		} catch (error) {
			response.json({
				code: "404",
				message: error.message,
				data: {}
			})
		}
	}

	var Search = function(request, response){ 
	}

	return {
		Select,
		SelectById,
		Insert,
		Update,
		Delete,
		Search
	}

})()

module.exports = controller