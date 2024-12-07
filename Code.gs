function doPost(e) {

  const webhookData = JSON.parse(e.postData.contents).events[0];
  //log structure = [Date, UserId, ImageId, ReplyToken, Result]
  let log = [new Date(), webhookData.source.userId, webhookData.message.id, webhookData.replyToken]

  //Step1. Check message validity
  //if predefined text
  if (webhookData.message.type === "text" && (webhookData.message.text === "ingredients" || webhookData.message.text === "info")) {
    log.push("Predefined text")
    toSS(log)
    return null
  }
  //if not image
  if (webhookData.message.type !== "image") {
    log.push("Cannot process the input.")
    toSS(log)
    return sendMessageToLine(webhookData.replyToken, "Cannot process the input. Please send an image of product's label.")
  }


  //Step2. Get the image from Line and convert to base64
  const image = getImageFromLine(webhookData.message.id)
  const base64Image = Utilities.base64Encode(image);

  //Step3. Make request to cloud vision api
  const responseFromCloudVision = getResponseCloudVision(base64Image)

  //Step4. Check if there is any text
  const isExistText = checkResponse(responseFromCloudVision)
  if (!isExistText) {
    log.push("No text in image.")
    toSS(log)
    return sendMessageToLine(webhookData.replyToken, "Cannot recognize any text in the image. Please send an image of product's label.")
  }

  //Step5. Filter text that has any haram, syubhah ingredients
  const filteredText = getFilteredText(responseFromCloudVision)
  log.push(JSON.stringify(filteredText))

  //Step6. Create a reply message to send to Line
  const replyMessage = createReplyMessage(filteredText)

  //Step7. Log into ss
  toSS(log)

  return sendMessageToLine(webhookData.replyToken, replyMessage)
}

function createReplyMessage(filteredText) {
  let replyMessage = "";

  if (filteredText.length === 0)
    return "This product does not contains any haram or syubhah ingredients."

  replyMessage += "Ingredients that need attention are :\n";
  filteredText.forEach(function (data, i) {
    replyMessage += "Name : " + data.textEnglish + "\n";
    replyMessage += "Original Text : " + data.textJapanese + "\n";
    replyMessage += "Status : " + data.status;
    if (i !== filteredText.length - 1) replyMessage += "\n\n";
  });

  return replyMessage
}


function toSS(data) {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
  const sheet = ss.getSheetByName('Log');

  sheet.appendRow(data)
}
