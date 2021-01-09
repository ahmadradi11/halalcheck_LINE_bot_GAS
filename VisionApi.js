var APIKey = PropertiesService.getScriptProperties().getProperty('VISIONAPI_KEY');

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function buildJSONRequestImgUrl(img64) {
  return JSON.stringify({
    requests: [{
      image: {
        content : img64
//        source: {
//          imageUri: "https://storage.googleapis.com/halal-check-1-vcm/sample_image/1.jpg"
//        }
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
//  Logger.log(response);
  return JSON.parse(response);
}