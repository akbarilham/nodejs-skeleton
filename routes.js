var material = require('./material')
var auth = require('./authorization')

auth.route('/search').post(function(request, response) {
	material.Search(request, response)
})

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

auth.route('/push-notification').post(function(request, response) {
	material.PushNotification(request, response)
})

auth.route('/etl-convert').post(function(request, response) {
	material.EtlConvert(request, response)
})

auth.route('/messaging').post(function(request, response) {
	material.Messaging(request, response)
})

auth.route('/log-rotation').post(function(request, response) {
	material.LogRotation(request, response)
})

auth.route('/upload-image').post(function(request, response) {
	material.UploadImage(request, response)
})

module.exports = auth