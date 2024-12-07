var CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN')
var VISIONAPI_KEY = PropertiesService.getScriptProperties().getProperty('VISIONAPI_KEY')

function getImageFromLine(imageId) {
  var url = "https://api-data.line.me/v2/bot/message/" + imageId + "/content";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
  };
  var options = {
    "method": "GET",
    "headers": headers,
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url, options);
  return response.getContent();
}

function sendMessageToLine(token, replyMessages) {
  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
  };

  var postData = {
    "replyToken": token,
    "messages": [{
      "type": "text",
      "text": replyMessages
    }]
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "muteHttpExceptions": true,
    "payload": JSON.stringify(postData)
  };
  UrlFetchApp.fetch(url, options);
  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getResponseCloudVision(base64Image) {

  const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISIONAPI_KEY;

  const jsonRequest = JSON.stringify({
    requests: [{
      image: {
        content : base64Image
      },
      features: [{
        type: "DOCUMENT_TEXT_DETECTION",
        maxResults: 1
      }]
    }]
  });

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': jsonRequest
  };

  var response = UrlFetchApp.fetch(visionApiUrl, options);
  return JSON.parse(response);
}