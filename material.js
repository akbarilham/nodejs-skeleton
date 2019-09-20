var controller = require('./controller')

var material = (function(){

	var Search = function(request, response){
        var data = {
            filter: request.body.filter,
            sort: request.body.sort
        }         
		var pagination = {
			pageSize: request.body.pageSize,
			page: request.body.page
		}
		controller.Search(response, data, pagination)
	}

	var Select = function(request, response){
		var offset = request.body.page * request.body.pageSize
		var limit = offset + request.body.pageSize
		var skip = request.body.pageSize * (request.body.page - 1)
		var pagination = {} 
		pagination.pageSize = request.body.pageSize // How many records per page
		pagination.page = request.body.page // The number of the page
		pagination.limit = limit
		pagination.offset = offset
		pagination.skip = skip
		controller.Select(response, false, pagination)
	}

	var SelectById = function(request, response){
        var data = {
            id: request.body.id
        }
		var pagination={ 
			pageSize: request.body.pageSize,
			page: request.body.page
		}
		controller.Select(response, data, pagination)
	}

	var Insert = function(request, response){
        var data = { 
			view_time: request.body.view_time, 
			url: request.body.url,
			user_agent: request.body.user_agent,
			referrer: request.body.referrer,
			device_type: request.body.device_type
        }
		controller.Insert(response, data, false)
	}

	var Update = function(request, response){
        var data = { 
            id: request.body.id,
			view_time: request.body.view_time, 
			url: request.body.url,
			user_agent: request.body.user_agent,
			referrer: request.body.referrer,
			device_type: request.body.device_type
		}
		controller.Update(response, data, false)
	}

	var Delete = function(request, response){
		var data = { 
            id: request.body.id
		}
		controller.Delete(response, data, false)
	}

	return {
		// Plaza //
		Search,
        Select,
        SelectById,
		Insert,
		Update,
		Delete
	}

})()

module.exports = material