require('env2')('.env')
const model = require("./model")

var controller = (function(){

	var Search = async function(response, data, pagination){ 
		try {
			var example = await model.Example.findAll({})
			if (example.length !== 0) {
				response.status(200).send({
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

	var Select = async function(response, data, pagination){
		try {
			var example = await model.Example.findAndCountAll({
				limit: pagination.limit,
				offset: pagination.offset
			})
			// var example = await model.Example.findAll({})
			if (example.length !== 0) {
				response.status(200).send({
					data: example,
					message: "Search Success",
					currentPage: pagination.page,
					totalPage: Math.ceil(example.count / pagination.pageSize)
				})
			} else {
				response.status(204).send({message: "Data Empty"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var SelectById = async function(response, data, pagination){
		try {
			var example = await model.Example.findOne({where: {id: data.id}	})
			if (example.length !== 0) {
				response.status(200).send({
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

	var Insert = async function(response, data, pagination){
		try {
			var example = await model.Example.create(data)
			if (example) {
				response.status(200).send({message: "Insert success"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var Update = async function(response, data, pagination){
		try {
			var example = await model.Example.update(data, {where: {id: data.id} })
			if (example) {
				response.status(200).send({message: "Update success"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var Delete = async function(response, data, pagination){
		try {
			var example = await model.Example.destroy({where: {id: data.id} })
			if (example) {
				response.status(200).send({message: "Delete success"})
			}
		} catch (error) {
			response.status(404).send({message: error.message})
		}
	}

	var PushNotification = async function(response, data, pagination) {
		try {
			let parallelSubscriptionCalls = await subscriptions.map((subscription) => {
				return new Promise((resolve, reject) => {
					const pushSubscription = {
						endpoint: subscription.endpoint,
						keys: {
							p256dh: subscription.keys.p256dh,
							auth: subscription.keys.auth
						}
					}
					const pushPayload = JSON.stringify(payload)
					const pushOptions = {
						vapidDetails: {
							subject: "http://example.com",
							privateKey: keys.privateKey,
							publicKey: keys.publicKey
						},
						TTL: payload.ttl,
						headers: {}
					}
					webPush.sendNotification(
						pushSubscription,
						pushPayload,
						pushOptions
					).then((value) => {
						resolve({
							status: true,
							endpoint: subscription.endpoint,
							data: value
						})
					}).catch((error) => {
						reject({
							status: false,
							endpoint: subscription.endpoint,
							data: error
						})
					})
				})
			})
			q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
				console.info(pushResults)
			})
			res.json({data: 'Push triggered'})
		} catch (error) {
			response.status(500).send({error: 'Technical error occurred', message: error.message})	
		}
	}

	return {
		Search,
		Select,
		SelectById,
		Insert,
		Update,
		Delete,
		PushNotification
	}

})()

module.exports = controller