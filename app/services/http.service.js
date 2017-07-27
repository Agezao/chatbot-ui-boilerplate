'use strict';
var apiUrl = 'http://localhost:5010/api';

var HttpService = function() {
	
	//private
	var updateContext = function(response) {
		if(response && response.data && response.data.data && response.data.data.context)
			localStorage.context = JSON.stringify(response.data.data.context);
	}

	//public
	var Request = function(route, method, data) {
		return axios({
			  method: method,
			  url: apiUrl + route,
			  data: data
			})
			.then(function(response) {
				updateContext(response);
				return response.data;
			});
	}

	var httpService = {
		Request: Request
	}
	return httpService;
};
