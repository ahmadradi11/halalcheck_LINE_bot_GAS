function checkResponse(data) {
  //check if data not contain any responses, return zero array
  if (!data.responses[0].hasOwnProperty("textAnnotations"))
    return false;

  return true
}

function getFilteredText(data) {

  //1. Remove first data as it is a paragraph of detected text
  data.responses[0].textAnnotations.shift();

  //2. Filter all data to get only Japanese text
  var japaneseOnlyText = [];
  for (var d of data.responses[0].textAnnotations) {
    var regex = /^[一-龠ぁ-ゔァ-ヴー]+$/g;
    if (regex.test(d.description)) japaneseOnlyText.push(d);
  }

  //3. if there is not japanese text, return empty array
  if(japaneseOnlyText.length === 0){
    Logger.log("No Japanese text")
    return []
  }

  //4. Filter out any haram,syubhah ingredients from japaneseOnlyText using Pattern.gs
  var detected = [];
  var pattern = getPattern();
  for (var patt of pattern) {
    var scanResultObj = scan(japaneseOnlyText, patt);
    if (Object.keys(scanResultObj).length !== 0) {
      if ((scanResultObj.textJapanese === "乳化剤") && detected.some(d => d.textJapanese === "乳化剤大豆由来")) continue;
      detected.push(scanResultObj);
    }
  }
  return detected;
}


/**
 * Return empty object if not found
 */
function scan(list, pattern) {
  var partialyMatched = [];
  for (var i = 0; i < list.length; i++) {

    //if pattern match exactly, remove the object from array and return the object
    if (list[i].description === pattern.textJapanese) {
      var result = { "textJapanese": list[i].description, "boundingPoly": [list[i].boundingPoly], "textEnglish": pattern.textEnglish, "status": pattern.status };
      list.splice(i, 1);
      return result;
    }

    //if pattern match partly, insert into matched array
    if (pattern.textJapanese.match(list[i].description) !== null) {
      partialyMatched.push(list[i]);
    }

  }
  //if there are only 1 or less object in partialyMatched array, return empty object
  if (partialyMatched.length < 2) return {};

  //combine all text in matched, then check if equal to pattern
  var str = "";
  for (var m of partialyMatched) {
    if (str !== pattern.textJapanese) str += m.description;
  }
  if (str === pattern.textJapanese) {
    var boundingPoly = [];

    for (var m of partialyMatched) {
      boundingPoly.push(m.boundingPoly)
    }

    var result = { "textJapanese": str, "boundingPoly": boundingPoly, "textEnglish": pattern.textEnglish, "status": pattern.status };
    //    index.forEach(i => delete list[i]);

    return result;
  }
  return {};
}