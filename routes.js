var express = require('express')
var routes = express.Router()
var jwt_token = require('./jwt_token')
var controller = require('./controller')

routes.post('/login', function(req, res, next) {
	controller.Login(req, res, next)
})

routes.post('/select', jwt_token, function(request, response, next) {
	controller.Select(request, response, next)
})

routes.post('/select-by-id', jwt_token, function(request, response, next) {
	controller.SelectById(request, response, next)
})

routes.post('/insert', jwt_token, function(request, response, next) {
	controller.Insert(request, response, next)
})

routes.post('/update', jwt_token, function(request, response, next) {
	controller.Update(request, response, next)
})

routes.post('/delete', jwt_token, function(request, response, next) {
	controller.Delete(request, response, next)
})

routes.post('/search', jwt_token, function(request, response, next) {
	controller.Search(request, response, next)
})

module.exports = routes;