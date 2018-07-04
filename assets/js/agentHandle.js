let baseUrl = 'http://localhost:8000'

let detectEndpoint = `/api/detectIntent`

// Send request and log result
let sendQuery = (query) => {
		let requestBody = {
				queryText: query
		}

		return new Promise((resolve, reject) => {
				$.ajax(baseUrl + detectEndpoint, {
						contentType: 'application/json',
						method: 'POST',
						data: JSON.stringify(requestBody),
				}).done((data) => {
						console.log('dialog flow data: ', data);
						if (data.success) {
							resolve(data.result.fulfillmentText);
						}
				})
		})
}

$('.user-input').on('keypress', (e) => {
		console.log(e.which);
		if (e.which === 13) {
				let inputMsg = $('.user-input').val();
				$('div.chat-container').append('<p class="user-msg">' + inputMsg + '</p>');
				$('.user-input').val('');
				sendQuery(inputMsg).then((res) => {
						$('div.chat-container').append('<p class="bot-msg">' + res + '</p>')
				});
		}
})