'use strict';

let botCtx = new BotUI('app');
let _ThreadService = new ThreadService(botCtx);
let _MessageService = new MessageService(_ThreadService);

_ThreadService.LoadHistory();

// Starting conversation
_ThreadService.AddMessage(['Hello there!', 'How can I help you?'], false, false);
_ThreadService.AddAction()
	.then(function(response) {
		_ThreadService.SaveHistory(response.value, true);
		_MessageService.Handle(response.value);
	});