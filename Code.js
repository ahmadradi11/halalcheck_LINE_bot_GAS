var msgIdSample = ["13164513496309", "13156871153795", "13171197021528", "13182316642671"];
var sampleEvent = {"replyToken":"fe1fa65ee052410ca30f9685590cb352", "mode":"active", "message":{"contentProvider":{"type":"line"}, "id":msgIdSample[3], "type":"image"}, "timestamp":"1.60665194342E12", "type":"message", "source":{"type":"user", "userId":"U2339cf2c25c42a27c8150dd5efd94060"}};

function getToken(){
  var channel_access_token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
//  Logger.log(channel_access_token);
  return channel_access_token;
}
//返信する
function sendLineMessageFromReplyToken(token, replyText) {
 var url = "https://api.line.me/v2/bot/message/reply";
 var headers = {
   "Content-Type": "application/json; charset=UTF-8",
   "Authorization": "Bearer " + getToken()
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

//  toSS(webhookData);
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
//  else replyText += "Cannot process the input. Please send an image of product's label";
  Logger.log(replyText);
  return sendLineMessageFromReplyToken(webhookData.replyToken, replyText);
}