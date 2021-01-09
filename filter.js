function getFilteredData(imgId){
//  imgId = "13115649400741";
  var url = "https://api-data.line.me/v2/bot/message/"+imgId+"/content";
  var headers = {
   "Content-Type": "application/json; charset=UTF-8",
   "Authorization": "Bearer " + PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN')
 };
  var options = {
   "method": "GET",
   "headers": headers,
   "muteHttpExceptions":true};
  var response = UrlFetchApp.fetch(url, options);
  var img64 = Utilities.base64Encode(response.getContent());
//  Logger.log(makeRequest(img64));
  return filterDataFromVisionApi(makeRequest(img64));
}

function filterDataFromVisionApi(data) {
  
  //check if data not contain any responses
  if(!data.responses[0].hasOwnProperty("textAnnotations")) return "no responses";
  //use shift() to delete index 0 object
  data.responses[0].textAnnotations.shift();
//  toSS(JSON.stringify(data));
//filter out any non japanese characters
  var filtered = [];
  data.responses[0].textAnnotations.forEach(d =>{
    var regex = /^[一-龠ぁ-ゔァ-ヴー]+$/g;
    if(regex.test(d.description)) filtered.push(d);
  });

//filtered.forEach(d => Logger.log("filtered: " + d.description));

  var detected = [];
  var pattern = getPattern();
//  scan pattern in filtered data
  for (var patt of pattern) {
    var scan_result = scan(filtered, patt);
    if(scan_result){
      if((scan_result.textJapanese === "乳化剤") && detected.some(d=>d.textJapanese === "乳化剤大豆由来")) continue;
      detected.push(scan_result);
    }
  }

//  detected.forEach(obj => Logger.log("detected: " + obj.textJapanese));
  return detected;
}

function scan(list, pattern) {
  /*find any pattern match  of the ingredient from the filtered list  */
  var partialyMatched = [];
  for (var i = 0; i < list.length; i++) {
    if(list[i] === undefined) return false;
    
    //if pattern match exactly, remove the object from array and return the object
    if(list[i].description === pattern.textJapanese){
      var result = {"textJapanese": list[i].description, "boundingPoly":[list[i].boundingPoly], "textEnglish":pattern.textEnglish, "status":pattern.status};
      list.splice(i, 1);
      return result;
    }
    
    //if pattern match partly, insert into matched array
    var index = [];
    if(pattern.textJapanese.match(list[i].description) !== null){
//      Logger.log(pattern.textJapanese + " : "+list[i].description);
      partialyMatched.push(list[i]);
      index.push(i);
    }
    
  }
  //if there are only 1 or less object in partialyMatched array, return false
  if(partialyMatched.length < 2) return false;
  
  //combine all text in matched, then check if equal to pattern
  var str = "";
  partialyMatched.forEach(m => {
    if(str !== pattern.textJapanese) str += m.description;
  });
  if(str === pattern.textJapanese){
    var boundingPoly = [];
    partialyMatched.forEach(m => boundingPoly.push(m.boundingPoly));
    
    var result = {"textJapanese": str, "boundingPoly": boundingPoly, "textEnglish":pattern.textEnglish, "status":pattern.status};
//    index.forEach(i => delete list[i]);
  
    return result;
  }
  return false;
}

