import line from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);

export const messageHandler = (message, replyToken) => {
  if(message.type !== 'text') return Promise.resolve(null);

  //RegularExpression , if message.text don't contains keyword , return null
  const patten = new RegExp('教學|保單');
  if(!patten.test(message.text)) {
    return Promise.resolve(null);
  }
  return replyMessageAction(1, replyToken); //傳訊息拉出去共用
}

///這邊還沒用到
export const postbackHandler = (postback, replyToken) => {
  console.log(postback);
  //const echo = { type: 'text', text: postback };
  //return client.replyMessage(event.replyToken, echo);
}


//這一部分傳送影片,圖片訊息有問題
const replyMessageAction = (step, replyToken) => {
  //第一步
  if(step === 1) {
    //影片的範例 無法讀取
    client.replyMessage(replyToken, {
      type: 'video',
      originalContentUrl: 'https://www.youtube.com/shorts/RnKdlQDn6uA.mp4',
      previewImageUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
    });
    //圖片的範例 會死圖
    // client.replyMessage(replyToken, {
    //   type: 'image',
    //   originalContentUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-200kb.jpg',
    //   previewImageUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
    // });
  }
}