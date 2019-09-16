var jwt = require('jsonwebtoken')

module.exports = function (request, response, next) {
	var token = request.body.token || request.query.token || request.headers.authorization
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
}