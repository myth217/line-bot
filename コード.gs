//CHANNEL_ACCESS_TOKENを設定
//LINE developerで登録をした、自分のCHANNEL_ACCESS_TOKENを入れて下さい
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();  // スクリプトプロパティを取得
const ACCESS_TOKEN = SCRIPT_PROPERTIES.getProperty("ACCESS_TOKEN");

const sheet_url = SCRIPT_PROPERTIES.getProperty("sheet_url");
let spread = SpreadsheetApp.openByUrl(sheet_url);
  // スプレッドシート内のシート一覧を取得
let sheets = spread.getSheets();
  // 指定したシート(1番目)の左上に書き込み




// イベントを受け取って実行する
function doPost(e){
  const EVENTS = JSON.parse(e.postData.contents).events;
  for (const event of EVENTS){
    execute(event);
  }
}
// イベントを実行する
function execute(event){
  const EVENT_TYPE = event.type;          // イベントのタイプ

  const REPLY_TOKEN = event.replyToken;   // 応答メッセージを送る際に使用する応答トークン
  let reply_messages = '';
  let event_source_type = event.source.type;
  const USER_ID = event.source.userId;    // 送信元ユーザーのID　どのタイプの部屋でも取得が可能

  if(EVENT_TYPE === "follow"){            // フォローイベントの場合
  }
  else if(EVENT_TYPE === "message"){     //メッセージであった場合
          // メッセージイベントの場合
      if(event.message.type === "text"){    // メッセージでなおかつテキストであった場合

          let user_message = event.message.text;      // 受け取ったテキスト

          if('メニュー' == user_message) {
            let payload = {
              "replyToken" : REPLY_TOKEN,
              "messages" : [
                {
                  'type':'flex',//ここの宣言が必須
                  'altText':'this is a flex message',
                  'contents': {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "メニュー",
                          "weight": "bold",
                          "size": "xl",
                          "align": "center"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "ツール",
                            "text": "ツール"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "text": "仕事系",
                            "label": "仕事系"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "ゲーム",
                            "text": "ゲーム"
                          }
                        }
                      ],
                      "flex": 0
                    }
                  }
                  
                }
              ]
            };
            sendReplyMessage(payload);
          }
          if ('カレンダー' == user_message) {
            let payload = {
              "replyToken" : REPLY_TOKEN,
              "messages" : [
                {
                  'type':'flex',//ここの宣言が必須
                  'altText':'this is a flex message',
                  'contents': {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "カレンダー",
                          "weight": "bold",
                          "size": "xl",
                          "align": "center"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "予定追加",
                            "text": "予定追加"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "text": "予定確認",
                            "label": "予定確認"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "予定削除",
                            "text": "予定削除"
                          }
                        },
                      ],
                      "flex": 0
                    }
                  }
                  
                }
              ]
            };
            sendReplyMessage(payload);
          }
          if('ツール' == user_message) {
            let payload = {
              "replyToken" : REPLY_TOKEN,
              "messages" : [
                {
                  'type':'flex',//ここの宣言が必須
                  'altText':'this is a flex message',
                  'contents': {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ツール",
                          "weight": "bold",
                          "size": "xl",
                          "align": "center"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "明日の天気",
                            "text": "明日の天気"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "カレンダー",
                            "text": "カレンダー"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "割り勘",
                            "text": "割り勘"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "目的地",
                            "text": "目的地"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "財布管理",
                            "text": "財布管理"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "ランダム",
                            "text": "ランダム"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "家計簿",
                            "text": "家計簿"
                          }
                        },
                      ],
                      "flex": 0
                    }
                  }
                  
                }
              ]
            };
            sendReplyMessage(payload);
          }
          if('仕事系' == user_message) {
            let payload = {
              "replyToken" : REPLY_TOKEN,
              "messages" : [
                {
                  'type':'flex',//ここの宣言が必須
                  'altText':'this is a flex message',
                  'contents': {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "仕事系",
                          "weight": "bold",
                          "size": "xl",
                          "align": "center"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "確定申告",
                            "text": "確定申告"
                          }
                        }
                      ],
                      "flex": 0
                    }
                  }
                }
              ]
            };
            sendReplyMessage(payload);
          }
          if('ゲーム' == user_message) {
            let payload = {
              "replyToken" : REPLY_TOKEN,
              "messages" : [
                {
                  'type':'flex',//ここの宣言が必須
                  'altText':'this is a flex message',
                  'contents': {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ゲーム",
                          "weight": "bold",
                          "size": "xl",
                          "align": "center"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "モンスト",
                            "text": "モンスト"
                          }
                        },
                        {
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "ブラックジャック",
                            "text": "ブラックジャック"
                          }
                        },
                      ],
                      "flex": 0
                    }
                  }
                  
                }
              ]
            };
            sendReplyMessage(payload);
          }        
          if('モンスト'== user_message)  {
              let payload = {
                  "replyToken" : REPLY_TOKEN,
                  "messages" : [
                    {
                      'type':'flex',　//ここの宣言が必須
                      'altText':'this is a flex message',
                      //↓このcontentsの部分にSimulatorのJSONをコピー
                      
                      'contents': {
                        "type": "bubble",
                        "hero": {
                        "type": "image",
                        "url": "https://appmedia.jp/wp-content/themes/appmedia/lib/monst/images/img/top_title_monst_2022.jpg",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "action": {
                            "type": "uri",
                            "uri":  "https://static.monster-strike.com/line/?target=stage&pass_code=MjA2ODg1OTQwMDky"
                        }
                        },
                        "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "contents": [

                            {
                            "type": "button",
                            "style": "link",
                            "height": "sm",
                            "action": {
                                "type": "uri",
                                "label": "モンストを開く",
                                "uri": "https://static.monster-strike.com/line/?target=stage&pass_code=MjA2ODg1OTQwMDky"
                            }
                            },
                            {
                              "type": "button",
                              "style": "link",
                              "height": "sm",
                              "action": {
                                "type": "uri",
                                "label": "gamewithを開く",
                                "uri": "https://gamewith.jp/"
                              }
                            },
                            {
                            "type": "spacer",
                            "size": "sm"
                            }
                        ],
                        "flex": 0
                        }
                    } 
                    }
                  ]
                };
              sendReplyMessage(payload);
          }
          if ('割り勘' == user_message) {
            let payload = {
              "replyToken" : REPLY_TOKEN,
              "messages" : [
                {
                  'type':'flex',//ここの宣言が必須
                  'altText':'this is a flex message',                  
                  'contents':
                  {
                    "type": "bubble",
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "weight": "bold",
                          "size": "md",
                          "text": "人数を選択してくださいませ"
                        }
                      ]
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "button",
                          "style": "secondary",
                          "height": "sm",
                          "action": {
                            "type": "postback",
                            "label": "2人",
                            "data": "warikan_2",
                            "inputOption": "openKeyboard",
                            "displayText": "２人"
                            
                          }
                        },
                        {
                          "type": "button",
                          "style": "secondary",
                          "height": "sm",
                          "action": {
                            "type": "postback",
                            "label": "3人",
                            "data": "warikan_3",
                            "inputOption": "openKeyboard",
                            "displayText": "３人"
                          }
                        },
                        {
                          "type": "button",
                          "style": "secondary",
                          "height": "sm",
                          "action": {
                            "type": "postback",
                            "label": "4人",
                            "data": "warikan_4",
                            "inputOption": "openKeyboard",
                            "displayText": "4人"
                          }
                        },
                        {
                          "type": "button",
                          "style": "secondary",
                          "height": "sm",
                          "action": {
                            "type": "postback",
                            "label": "5人",
                            "data": "warikan_5",
                            "inputOption": "openKeyboard",
                            "displayText": "5人"
                          }
                        },
                        // {
                        //   "type": "button",
                        //   "style": "secondary",
                        //   "height": "sm",
                        //   "action": {
                        //     "type": "postback",
                        //     "label": "その他",
                        //     "data": "warikan_ex",
                        //     "inputOption": "openKeyboard",
                        //     "displayText": "その他"
                        //   }
                        // }
                      ],
                      "flex": 0
                    }
                  }
                }
              ]
            };
            sendReplyMessage(payload);
          }

          let warikan_flg = sheets[0].getRange(2, 2).getValue();
          if (warikan_flg == true){
            // 整数である
              if (!isNaN(user_message)) {
                user_message = user_message - 0 // 数値化
            
                let warikan_per = sheets[0].getRange(2, 3).getValue();
                
                // 結果       = 金額 / 人数
                let result = user_message / warikan_per;
    
                reply_messages = '一人あたり \n ￥' +result;
    
                sheets[0].getRange(2, 2).setValue('false');  //シートのワリカンスイッチをoff
                sheets[0].getRange(2, 3).setValue('');  //シートに割り勘人数をinit
    
                  let payload = {
                    'replyToken': REPLY_TOKEN,//特定の相手に返信するためのトークン
                    'messages': [{
                    'type': 'text',             //返信のタイプ
                    'text': reply_messages    //内容
                    }]
                  };
                  sendReplyMessage(payload);
              }
          }


      }
  }
  else if(EVENT_TYPE === "postback"){    // ポストバックイベントの場合
    if (event.postback.data.includes('warikan')) {
      
      // postback data を warikan_ と 個数 に分割
      let select_warikan = event.postback.data.split('_');

      sheets[0].getRange(2, 2).setValue('true');  //シートのワリカンスイッチをon
      sheets[0].getRange(2, 3).setValue(select_warikan[1]);  //シートに割り勘数を記載


      if(select_warikan[1] == 'ex') {
        reply_messages = '人数を入力してください';
        let payload = {
          'replyToken': REPLY_TOKEN,　//特定の相手に返信するためのトークン
          'messages': [{
          'type': 'text',             //返信のタイプ
          'text': reply_messages    //内容
          }]
        };
        sendReplyMessage(payload);
      }


      reply_messages = "金額を入力して下さい \n 割り勘人数:" + select_warikan[1] + '人';

      let payload = {
        'replyToken': REPLY_TOKEN,//特定の相手に返信するためのトークン
        'messages': [{
        'type': 'text',             //返信のタイプ
        'text': reply_messages    //内容
        }]
      };
      sendReplyMessage(payload);
    }
  }
}

// function execute(event){} 内部 で sendReplyMessage()を呼び出す
function sendReplyMessage(payload){
  const URL = "https://api.line.me/v2/bot/message/reply";
  // ここで実際にlineに接続しに行ってる
  const RES = UrlFetchApp.fetch(URL, {
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + ACCESS_TOKEN,
    },
    "method": "post",
    'payload' : JSON.stringify(payload),
  });
  return RES;
}



