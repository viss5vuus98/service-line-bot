import line from '@line/bot-sdk';
import { getFlexMessageContent, getVideoMessageContent, getImageMessageContent, defaultLastStep } from './messageContent.js';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

//處理message，開始教學流程
export const messageHandler = (message, replyToken) => {
  if(message.type !== 'text') return Promise.resolve(null);
  //RegularExpression , if message.text don't contains keyword , return null 
  //用正規表達式來判斷是否包含關鍵字，如果沒有包含關鍵字，就不回傳訊息
  const patten = new RegExp('教學|保單');
  if(!patten.test(message.text)) {
    return Promise.resolve(null);
  }
  return replyMessageAction(1, replyToken); //第一部會固定傳入1
}

//處理postback，下一步或中斷教學
export const postbackHandler = (postback, replyToken) => {
  const params = new URLSearchParams(postback.data);
  switch(params.get('action')) {
    case 'continue':
      return replyMessageAction(parseInt(params.get('itemid')), replyToken);
    case 'break':
      return client.replyMessage(replyToken, { type: 'text', text: '感謝您，教學已中斷。' });
    default:
      return client.replyMessage(replyToken, { type: 'text', text: '發生錯誤，請稍後再試。' });
  }
}

const replyMessageAction = (step, replyToken) => {
  //最後一步時，回傳文字訊息
  if(step === defaultLastStep) {
    return client.replyMessage(replyToken, { type: 'text', text: '感謝您，教學已結束。' });
  }
  const flexMessage = getFlexMessageContent(step);
  const videoMessage = getVideoMessageContent(step);
  const imageMessage = getImageMessageContent(step);
  //訊息
  client.replyMessage(replyToken, [
    videoMessage,
    imageMessage,
    flexMessage      
  ]);
}