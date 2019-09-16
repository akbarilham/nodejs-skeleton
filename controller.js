require('env2')('.env')
const model = require("./model")

var controller = (function(){

	var Select = async function(request, response, next){
		try {
			var example = await model.Example.findAll({})
			if (example.length !== 0) {
				response.json({
					data: example,
					code: "200",
					message: "Success",
					// currentpage: 1,
					// perpage: 1,
					// totalpage: 1,
					lastpage: 1
				})
			} else {
				response.status(204).send({message: "Data Empty"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var Search = async function(request, response, next){ 
		try {
			var example = await model.Example.findAll({})
			if (example.length !== 0) {
				response.json({
					code: "200",
					message: "Success",
					data: example
				})
			} else {
				response.status(204).send({message: "Data Empty"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var SelectById = async function(request, response, next){
		try {
			var example = await model.Example.findOne({
				where: {id: request.body.id}
			})
			if (example.length !== 0) {
				response.json({
					code: "200",
					message: "Success",
					data: example
				})
			} else {
				response.status(204).send({message: "Data Empty"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
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
			var example = await model.Example.create({
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			})
			if (example) {
				response.json({
					code: "200",
					message: "Insert success",
					data: example
				})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var Update = async function(request, response, next){
		try {
			var exampleID = request.body.id
			var {
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			} = request.body
			var example = await model.Example.update({
				view_time,
				url,
				user_agent,
				referrer,
				device_type
			},{
				where: {
					id: exampleID
				}
			})
			if (example) {
				response.json({
					code: "200",
					message: "Update success",
					data: example
				})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var Delete = async function(request, response, next){
		try {
			var exampleID = request.body.id
			var example = await model.Example.destroy({
				where: {
					id: exampleID
				}
			})
			if (example) {
				response.json({
					code: "200",
					message: "Delete success",
					data: example
				})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
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