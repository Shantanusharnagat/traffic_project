const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'message sent using vscode',
        from: '+',
        to: '+919664271044'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));
