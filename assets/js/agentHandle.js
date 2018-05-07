// You can find your project ID in your Dialogflow agent settings
const projectId = 'shashabot-6947f'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'en';

// Instantiate a DialogFlow client.

let baseUrl = 'https:/dialogflow.googleapis.com/v2/'

let detectEndpoint = `projects/${projectId}/agent/sessions/${sessionId}:detectIntent`

// Send request and log result
let sendQuery = (query) => {
  let requestBody = {
      queryInput: {
          text: {
              text: query,
              languageCode: languageCode,
          },
      },
      queryParams: {
        timeZone: "Asia/Calcutta"
      }
  };  
  return new Promise((resolve, reject) => {
    $.ajax(baseUrl+detectEndpoint, {
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(requestBody),
      beforeSend: (xhr, settings) => { xhr.setRequestHeader('Authorization', 'Bearer ya29.c.El-wBdzMA7JzBH_z8j0FwXgRqGRTiq7isic7cKHqS6vlm_3f3EuA8Le8ce0ZH8k0wZQFQrz7ZUf5hvgiPOM6X08qGmy_2ea7bUaOkn4jLWjKHMoRS-1PLb-3WsvybDZm4w' ); } //temperory dev api token
    }).done( (data) => {
      console.log('dialog flow data: ', data);
      resolve(data.queryResult.fulfillmentText);
    })
  })
}

$('.user-input').on('keypress', (e) => {
  console.log(e.which);
  if(e.which === 13) {
    let ts = new Date();
    let inputMsg = $('.user-input').val();
    $('div.chat-container').append('<p class="user-msg">'+inputMsg+'</p>');
    $('.user-input').val('');
    sendQuery(inputMsg).then((res) => {
      $('div.chat-container').append('<p class="bot-msg">'+res+'</p>')
    });
  }
})