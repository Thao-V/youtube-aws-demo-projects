require("dotenv").config();

const express = require('express');
const { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs'); // AWS SDK v3

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



// Route to receive message from SQS
app.get('/receive-message', async (req, res) => {
  try {
    const params = {
      QueueUrl: SQS_URL,
      MaxNumberOfMessages: 1,  // Max number of messages to retrieve (up to 10)
      WaitTimeSeconds: 20,     // Long polling for up to 20 seconds (to reduce cost)
      VisibilityTimeout: 30   // How long to hide the message from other consumers (in seconds)
    };

    const data = await sqsClient.send(new ReceiveMessageCommand(params));
    
    if (data.Messages && data.Messages.length > 0) {
      const messageBody = data.Messages[0].Body;
      console.log('Received message:', messageBody);

      // After processing, delete the message from the queue to prevent it from being received again
      const deleteParams = {
        QueueUrl: params.QueueUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      await sqsClient.send(new DeleteMessageCommand(deleteParams));
      console.log('Message deleted from the queue');
      
      // Send the message back in the response
      return res.status(200).json({ message: messageBody });
    } else {
      return res.status(404).json({ message: 'No messages received' });
    }
  } catch (err) {
    console.error('Error receiving message:', err);
    return res.status(500).json({ error: 'Error receiving message from SQS' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
