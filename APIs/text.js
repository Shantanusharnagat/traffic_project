const axios = require('axios');

async function sendSMS(){


const options = {
  method: 'POST',
  url: 'https://textflow-sms-api.p.rapidapi.com/send-sms',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '5bbe6357c8mshba17bbd35f0d2c8p1359a1jsn5da9458963a0',
    'X-RapidAPI-Host': 'textflow-sms-api.p.rapidapi.com'
  },
  data: {
    phone_number: '+919766807601',
    text: 'Test message from TextFlow'
  }
};


try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}

sendSMS();