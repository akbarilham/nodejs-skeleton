var jwt = require('jsonwebtoken')
var express = require('express')
var authorization = express.Router()

authorization.use(function(request, response, next) {
	var token = request.body.token || request.query.token || request.headers.authorisation
	if (token) {
		jwt.verify(token, 'jwtsecret', function(error, decoded){
			if (error) {
				response.json({message: 'Failed to authenticate token'})
			} else {
				request.decoded = decoded
				next()
			}
		})
	} else {
		return response.status(403).send({message: 'No token provided.'})
	}
})

module.exports = authorization