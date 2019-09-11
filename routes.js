var express = require('express')
var routes = express.Router()
var controller = require("./controller")
var database = require("./database")

routes.post('/select', function(request, response, next) {
	controller.Select(request, response, next)
})

routes.post('/select-by-id', function(request, response, next) {
	controller.SelectById(request, response, next)
})

routes.post('/insert', function(request, response, next) {
	controller.Insert(request, response, next)
})

routes.post('/update', function(request, response, next) {
	controller.Update(request, response, next)
})

routes.post('/delete', function(request, response, next) {
	controller.Delete(request, response, next)
})

routes.post('/search', function(request, response, next) {
	controller.Search(request, response, next)
})

module.exports = routes;