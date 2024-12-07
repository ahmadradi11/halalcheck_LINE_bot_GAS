function getPattern() {
  var pattern = [
    {
      "textJapanese": "豚肉",
      "textEnglish": "Pork",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ポーク",
      "textEnglish": "Pork",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "豚脂",
      "textEnglish": "Pork Fat",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "豚脂肪",
      "textEnglish": "Pork Fat",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ラード",
      "textEnglish": "Lard",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "牛肉",
      "textEnglish": "Beef",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "牛脂",
      "textEnglish": "Beef Fat",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "動物性油脂",
      "textEnglish": "Animal Fat",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "加工油脂",
      "textEnglish": "Processed Fat",
      "status": "Syubhah",
      "confidence": ""
    },
    {
      "textJapanese": "食用精製加工油脂",
      "textEnglish": "Processed Fat",
      "status": "Syubhah",
      "confidence": ""
    },
    {
      "textJapanese": "食用油脂",
      "textEnglish": "Fat for cooking",
      "status": "Syubhah",
      "confidence": ""
    },
    {
      "textJapanese": "混合油脂",
      "textEnglish": "Mixed Fat",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "コンソメ",
      "textEnglish": "Consomme",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "鶏肉",
      "textEnglish": "Chicken",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ハム",
      "textEnglish": "Ham",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ビーフ",
      "textEnglish": "Beef",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "チキン",
      "textEnglish": "Chicken",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "アルコール",
      "textEnglish": "Alcohol",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "洋酒",
      "textEnglish": "Western Liquor",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "酒精",
      "textEnglish": "Ethyl Alcohol",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ラム",
      "textEnglish": "Rum",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "酒",
      "textEnglish": "Sake(alcohol)",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ワイン",
      "textEnglish": "Wine",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ブランディ",
      "textEnglish": "Brandy",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ウィスキー",
      "textEnglish": "Whiskey",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "味醂",
      "textEnglish": "Mirin",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "みりん",
      "textEnglish": "Mirin",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "ゼラチン",
      "textEnglish": "Gelatine",
      "status": "Haram",
      "confidence": ""
    },
    {
      "textJapanese": "マーガリン",
      "textEnglish": "Margarine",
      "status": "Syubhah",
      "description": "It can be derived from animal or vegetable",
      "confidence": ""
    },
    {
      "textJapanese": "ショートニング",
      "textEnglish": "Shortening",
      "status": "Syubhah",
      "description": "It can be derived from animal or vegetable",
      "confidence": ""
    },
    {
      "textJapanese": "ショートーニング",
      "textEnglish": "Shortening",
      "status": "Syubhah",
      "description": "It can be derived from animal or vegetable",
      "confidence": ""
    },
    //    {
    //      "textJapanese" : "油脂",
    //      "textEnglish" : "Fat",
    //      "status" : "Syubhah",
    //      "description" : "It can be derived from animal or vegetable",
    //      "confidence" : ""
    //    },
    {
      "textJapanese": "ファットスプレッド",
      "textEnglish": "Fatspread",
      "status": "Syubhah",
      "description": "It can be derived from animal or vegetable",
      "confidence": ""
    },
    {
      "textJapanese": "コラーゲンペプチド",
      "textEnglish": "Collagen",
      "status": "Syubhah",
      "description": "It can be derived from fish or animal(pork, beef, chicken)",
      "confidence": ""
    },
    {
      "textJapanese": "乳化剤大豆由来",
      "textEnglish": "Emulsifier",
      "status": "Halal",
      "description": "Vegetable based emulsifier",
      "confidence": ""
    },
    {
      "textJapanese": "乳化剤",
      "textEnglish": "Emulsifier",
      "status": "Syubhah",
      "description": "It can be derived from animal or vegetable",
      "confidence": ""
    }

  ];

  return pattern;
}

function getTestPattern() {
  return [{
    "textJapanese": "マーガリン",
    "textEnglish": "Margarine",
    "status": "Syubhah",
    "description": "It can be derived from animal or vegetable",
    "confidence": ""
  },
  {
    "textJapanese": "ショートニング",
    "textEnglish": "Shortening",
    "status": "Syubhah",
    "description": "It can be derived from animal or vegetable",
    "confidence": ""
  }]
}
