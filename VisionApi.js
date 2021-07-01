var APIKey = PropertiesService.getScriptProperties().getProperty('VISIONAPI_KEY');

function buildJSONRequestImgUrl(img64) {
  return JSON.stringify({
    requests: [{
      image: {
        content : img64
      },
      features: [{
        type: "DOCUMENT_TEXT_DETECTION",
        maxResults: 1
      }]
    }]
  });
}


function makeRequest(img64) {
  // Make a POST request to Vision API with a JSON payload.      
  var visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' +
    APIKey;
  var JSON_REQ = buildJSONRequestImgUrl(img64);
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON_REQ
  };
  var response = UrlFetchApp.fetch(visionApiUrl, options);
  return JSON.parse(response);
}
