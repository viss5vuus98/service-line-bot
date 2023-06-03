import { messageHandler, postbackHandler } from './action.js';
import line from '@line/bot-sdk';
import express from 'express';
'use strict';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create Express app
const app = express();

app.use('/public', express.static('public')); 

app.get('/', (req, res) => {
  res.sendStatus(200);
});
// register a webhook handler with middleware
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log(event.type);
  switch (event.type) {
    case 'message':
      return messageHandler(event.message, event.replyToken);
    case 'postback':
      return postbackHandler(event.postback, event.replyToken);
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
