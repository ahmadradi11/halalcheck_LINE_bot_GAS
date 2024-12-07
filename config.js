var CHANNEL_ACCESS_TOKEN = "";
var VISIONAPI_KEY = '';

function toSS(data){
  SpreadsheetApp.openById("").getSheetByName("logs").appendRow([data]); 
}