// idはユーザーID
// richmenuidはリッチメニューID

function BindRichMenu(id,richmenuid){
  
 var url = "https://api.line.me/v2/bot/user/"+ id + "/richmenu/" + richmenuid;
  
 UrlFetchApp.fetch(url, {
   'method':'post',
   'headers': {     
     'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
     'payload':{}
              }                        
 });
}