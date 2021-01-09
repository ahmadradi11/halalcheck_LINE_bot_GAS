var CHANNEL_ACCESS_TOKEN = "bWFiJDXpUw/npxoDw4pvjGI5vi5HElRsBY7LjMXwp+2uYc2mgYHLGW7xznIJzOlithl7ESENYLHZkRkmeaDVrzpEPpJovB+r0nKHL1askH37j4bSNQVgQYAViscw2g7KmrhnqcNaraQbqsmvn6OgFQdB04t89/1O/w1cDnyilFU=";
var VISIONAPI_KEY = 'AIzaSyAf87ZJeliRw-CCGjry7Cf9LUldd1lOEq8';

function toSS(data){
  SpreadsheetApp.openById("1Wmr6ngxg9-zvlay04JdjEtA4YCpArX5w2upJSs25Aug").getSheetByName("logs").appendRow([data]); 
}