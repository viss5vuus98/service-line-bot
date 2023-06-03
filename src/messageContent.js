const baseURL = process.env.BASE_URL; //環境變數
const videoRootURL = `${baseURL}/public/video/`;
const imageRootURL = `${baseURL}/public/image/`;
export const defaultLastStep = 3;

//return flex message content
export const getFlexMessageContent = (step) => {
  const nextStepData = `action=continue&itemid=${step + 1}`;
  return {
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": `完成上方步驟(${step}/${defaultLastStep})，並與圖片相同的嗎？`,
            "margin": "md"
          },
          {
            "type": "separator",
            "margin": "20px"
          }
        ],
        "position": "relative",
        "margin": "2px",
        "width": "100%",
        "borderColor": "#000000"
      },
      "footer": {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "中斷教學",
              "data": "action=break&itemid=-1",
            }
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "繼續下一步",
              "data": nextStepData,
            }
          }
        ],
        "spacing": "sm"
      }
    }
  }
}

//return video message content
export const getVideoMessageContent = (step) => {
  const videoURL = `${videoRootURL}test${step}.mp4`;
  return {
        type: 'video',
        originalContentUrl: videoURL,
        previewImageUrl: `${imageRootURL}prewview.jpg`
      }
}

//return image message content
export const getImageMessageContent = (step) => {
  const imageURL = `${imageRootURL}test${step}.jpg`;
  return {
        type: 'image',
        originalContentUrl: imageURL,
        previewImageUrl: imageURL
      }
}