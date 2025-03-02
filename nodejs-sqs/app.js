require("dotenv").config();

const express = require('express');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs'); // AWS SDK v3

const {REGION, SQS_URL} = process.env;

if(!REGION || !SQS_URL){
  console.log("Please provide environment information.");
  return;
}

const app = express();
const port = 3000;

const sqsClient = new SQSClient({ region: REGION }); 

app.use(express.json());

app.post('/send-message', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message body is required' });
  }

  const params = {
    QueueUrl: SQS_URL,
    MessageBody: message
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log('Message sent successfully:', data.MessageId);
    return res.status(200).json({ messageId: data.MessageId });
  } catch (err) {
    console.error('Error sending message:', err);
    return res.status(500).json({ error: 'Error sending message to SQS' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
