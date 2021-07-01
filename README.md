# Halal Check Japan
Halal Check Japan is a LINE bot that read Japanese text in images and filter out any haram or syubhah substances from it. 
It aims to help anyone who can't read Japanese to check ingredients of any Japanese products.
The first version is an app which was built using Flutter but because of the simplicity of the functions, I decided to convert it into a bot.
<img src="https://github.com/ahmadradi11/halalcheck_LINE_bot_GAS/tree/main/img/halal-check-japan-logo.png" align="right" width="120" height="178">

## Technology
#### Google Apps Script
The source code was hosted in GAS because I am familiar with it and has been used it in my work.

#### Line Messenging API
  - Get the images that user upload to LINE.
  - Send it to Google Cloud Vision in Base64 format.
  - Reply back the result to the user.

#### Google Cloud Vision API
Detect any text in images using pre-trained machine learning model from Google.
