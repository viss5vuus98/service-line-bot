import { messageHandler, postbackHandler } from './action.js';
import line from '@line/bot-sdk';
import express from 'express';
'use strict';
//const line = require('@line/bot-sdk');
//const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// app.get('/', (req, res) => {
//   res.sendStatus(200);
// });

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  //console.log(req.body);
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
  //console.log(event.message);
  console.log(event.postback);
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
    //console.log(event);
    // const dataString = JSON.stringify({
    //   replyToken: req.body.events[0].replyToken,
    //   messages: [
    //     {
    //       "type": "text",
    //       "text": "Hello, user"
    //     },
    //     {
    //       "type": "text",
    //       "text": "May I help you?"
    //     }
    //   ]
    // })  
  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  //return client.replyMessage(event.replyToken, echo);
  // return client.replyMessage(event.replyToken, {
  //   type: 'sticker',
  //   packageId: '1',
  //   stickerId: '1'
  // });
  //const dataJSON = JSON.stringify()
  client.replyMessage(event.replyToken, 
    {
        type: 'video',
        originalContentUrl: 'https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
        previewImageUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
    }
  )
  // return client.replyMessage(event.replyToken, {
  //   type: 'flex',
  //   altText: 'Flex Message',
  //   contents: {
  //   "type": "bubble",
  //   "body": {
  //     "type": "box",
  //     "layout": "vertical",
  //     "contents": [
  //       {
  //         "type": "text",
  //         "text": "完成上方步驟，並與圖片相同的嗎？",
  //         "margin": "md"
  //       },
  //       {
  //         "type": "separator",
  //         "margin": "20px"
  //       }
  //     ],
  //     "position": "relative",
  //     "margin": "2px",
  //     "width": "100%",
  //     "borderColor": "#000000"
  //   },
  //   "footer": {
  //     "type": "box",
  //     "layout": "horizontal",
  //     "contents": [
  //       {
  //         "type": "button",
  //         "action": {
  //           "type": "postback",
  //           "label": "中斷教學",
  //           "data": "action=break&itemid=-1",
  //         }
  //       },
  //       {
  //         "type": "button",
  //         "action": {
  //           "type": "postback",
  //           "label": "繼續下一步",
  //           "data": "action=continue&itemid=2",
  //         }
  //       }
  //     ],
  //     "spacing": "sm"
  //   }
  // }
  // })
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
