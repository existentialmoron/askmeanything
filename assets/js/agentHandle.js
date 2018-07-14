// let axios = require('axios')

let baseUrl = 'http://ec2-54-174-92-4.compute-1.amazonaws.com:3000'

let detectEndpoint = `/api/detectIntent`

// Send request and log result
let sendQuery = (query) => {
	let requestBody = {
			queryText: query
	}

	return new Promise((resolve, reject) => {
		axios.post(baseUrl+detectEndpoint, requestBody)
			.then( res => {
				let data = res.data
				console.log('dialog flow data: ', data);
				if (data.success) {
					resolve(data.result.fulfillmentText);
				}
			})
			.catch(err => {
				console.log('error', err)
			})
	})
}

$('.user-input').on('keypress', (e) => {
		if (e.which === 13) {
				let inputMsg = $('.user-input').val();
				$('div.chat-container').append('<p class="user-msg">' + inputMsg + '</p>');
				let d = $('div.chat-container')
				d.scrollTop(d.prop("scrollHeight"));
				$('.user-input').val('');
				sendQuery(inputMsg).then((res) => {
					$('div.chat-container').append('<p class="bot-msg">' + res + '</p>')
					$("div.chat-container").animate({ scrollTop: $('.chat-container').prop("scrollHeight")}, 1000);
				});
		}
})