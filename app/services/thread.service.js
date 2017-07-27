'use strict';

var ThreadService = function(botCtx) {
	//Private
	var isLoading = false;
	var checkAndRemoveLoading = function() {
		if(isLoading)
			botCtx.message.remove(-1);
		isLoading = false;
	};

	var saveHistory = function(message) {
		var localHistory = !localStorage.messageHistory ? [] : JSON.parse(localStorage.messageHistory);
		localHistory.push(message);
		localStorage.messageHistory = JSON.stringify(localHistory);
	};
	var fetchHistory = function() {
		return !localStorage.messageHistory ? [] : JSON.parse(localStorage.messageHistory);
	};

	//Public
	var AddMessage = function(messages, isHuman = false, keepHistory = true) {
		checkAndRemoveLoading();

		if(typeof(messages) === 'object' && messages.length === undefined)
			messages = [messages];
		if(typeof(messages) === 'object' && messages.length > 0  && typeof(messages[0]) === 'string') {
			let objectMessages = [];
			messages.map(function(message) {
				objectMessages.push({
					content: message
				});
			});
			messages = objectMessages;
		}

		messages.map(function(message) {
			if(message.loading)
				isLoading = true;
			if(typeof(message.human) === 'undefined')
				message.human = isHuman;

			message.delay = 150;
			if(keepHistory)
				saveHistory(message);
			botCtx.message.add(message);
		});
	};

	var AddAction = function(action) {
		checkAndRemoveLoading();

		if(!action)
			action = {
				action: {
				  size: 40,
				  delay: 150,
				  placeholder: 'Escreva aqui...',
				}
			}

		return botCtx.action.text(action);
	};

	var SaveHistory = function(message, isHuman = false) {
		if(typeof(message) === 'string')
			message = {content: message};

		if(typeof(message.human) === 'undefined')
				message.human = isHuman;

		message.delay = 150;
		saveHistory(message);
	}

	var LoadHistory = function() {
		var messages = fetchHistory();
		if(messages && messages.length > 0)
			AddMessage(messages, null, false);
	}

	ThreadService = {
		AddMessage: AddMessage,
		AddAction: AddAction,
		SaveHistory: SaveHistory,
		LoadHistory: LoadHistory
	};
	return ThreadService;
};