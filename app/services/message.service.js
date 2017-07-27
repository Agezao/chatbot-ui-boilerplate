'use strict';

var MessageService = function(_ThreadService) {
	//private
	var _httpService = new HttpService();

	//public
	var Handle = function(message) {

		var messageVm = {message: message};
		if(localStorage.context)
			messageVm.context = JSON.parse(localStorage.context);

		return _httpService.Request('/messages', 'post', messageVm)
			.then(function(response) {
				_ThreadService.AddMessage(response.data.text);
				_ThreadService.AddAction()
					.then(function(actionresponse) {
						_ThreadService.SaveHistory(actionresponse.value, true);
						Handle(actionresponse.value);
					});
			});
	}

	var messageService = {
		Handle: Handle
	}
	return messageService;
};
