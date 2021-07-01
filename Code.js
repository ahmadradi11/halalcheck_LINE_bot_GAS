var channel_access_token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');

//返信する
function sendLineMessageFromReplyToken(token, replyText) {
 var url = "https://api.line.me/v2/bot/message/reply";
 var headers = {
   "Content-Type": "application/json; charset=UTF-8",
   "Authorization": "Bearer " + channel_access_token
 };
 var postData = {
   "replyToken": token,
   "messages": [{
     "type": "text",
     "text": replyText
   }]
 };
 var options = {
   "method": "POST",
   "headers": headers,
   "muteHttpExceptions":true,
   "payload": JSON.stringify(postData)
 };
 UrlFetchApp.fetch(url, options);
 return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet (request) {
  return ContentService.createTextOutput(JSON.stringify({
    post: "ok"
  }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if(e)
    var webhookData = JSON.parse(e.postData.contents).events[0];
  else
   var webhookData = sampleEvent;
  
  var replyText = "";
  if(webhookData.message.type == "image"){
    var messageId = webhookData.message.id;
    var detected = getFilteredData(messageId);
    if(detected == "no responses") return sendLineMessageFromReplyToken(webhookData.replyToken, "Cannot recognize any text in the image. Please send an image of product's label.");
    
    if(detected.length > 0){
      replyText += "Ingredients that need attention are :\n";
      detected.forEach(function(data, i){
         replyText += "Name : " + data.textEnglish + "\n";
         replyText += "Original Text : " + data.textJapanese + "\n";
         replyText += "Status : " + data.status;
         if (i !== detected.length-1) replyText += "\n\n";
      });
    }else replyText = "This product does not contains any haram or syubhah ingredients.";
  }
 
  return sendLineMessageFromReplyToken(webhookData.replyToken, replyText);
}
