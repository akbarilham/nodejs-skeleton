var material = require('./material')
var auth = require('./authorization')

auth.route('/select').post(function(request, response) {
	material.Select(request, response)
})

auth.route('/select-by-id').post(function(request, response) {
	material.SelectById(request, response)
})

auth.route('/insert').post(function(request, response) {
	material.Insert(request, response)
})

auth.route('/update').post(function(request, response) {
	material.Update(request, response)
})

auth.route('/delete').post(function(request, response) {
	material.Delete(request, response)
})

auth.route('/search').post(function(request, response) {
	material.Search(request, response)
})

module.exports = auth