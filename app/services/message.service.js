'use strict';

var MessageService = function(_ThreadService) {
	//private

	//public
	var Handle = function(message) {
		var reply = ['O seu saldo de hoje é:', 'R$ 1500,00', 'Algo mais que eu possa te ajudar?']; // processMessage(message); Call API for response

		_ThreadService.AddMessage(reply);
		_ThreadService.AddAction()
			.then(function(response) {
				_ThreadService.SaveHistory(response.value, true);
				Handle(response.value);
			});
	}

	var messageService = {
		Handle: Handle
	}
	return messageService;
};
