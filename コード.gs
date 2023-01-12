//CHANNEL_ACCESS_TOKENを設定
//LINE developerで登録をした、自分のCHANNEL_ACCESS_TOKENを入れて下さい
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();  // スクリプトプロパティを取得
const ACCESS_TOKEN = SCRIPT_PROPERTIES.getProperty("ACCESS_TOKEN");
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
  const USER_ID = event.source.userId;    // 送信元ユーザーのID
  const REPLY_TOKEN = event.replyToken;   // 応答メッセージを送る際に使用する応答トークン
  let reply_messages = '';
  if(EVENT_TYPE === "follow"){            // フォローイベントの場合
  }
  else if(EVENT_TYPE === "message"){      // メッセージイベントの場合
    if(event.message.type === "text"){    // テキストメッセージの場合
      let user_message = event.message.text;      // 受け取ったテキスト
          function isNum(val){
            return !isNaN(val)
          }
        let num_check = isNum(user_message);
        //写像かどうか
        if ('写像' == user_message) {
            reply_messages = '「' + user_message + '」ってなんすか？？';
            // payload を作る(ユーザー側に送るデータ)
            let payload = {
              'replyToken': REPLY_TOKEN,　//特定の相手に返信するためのトークン
              'messages': [{
              'type': 'text',             //返信のタイプ
              'text': reply_messages     //内容
              }]
            };
            //payloadを渡す
            sendReplyMessage(payload);
            //文字型で数値どうか
        }
        else if(num_check == true) {
            // 文字列から数値に
            user_message = user_message - 0;
            // ÷2
            user_message =  user_message / 2;
            //変数reply_messages に代入する
            reply_messages = '￥' + user_message + '円です。';
          let payload = {
            'replyToken': REPLY_TOKEN,　//特定の相手に返信するためのトークン
            'messages': [{
            'type': 'text',             //返信のタイプ
            'text': reply_messages    //内容
            }]
          };
            //payloadを渡す
              sendReplyMessage(payload);
        }
        else if('ひろゆき' == user_message) {
                let payload = {
                "replyToken" : REPLY_TOKEN,
               "messages" : [
                  {
                    'type':'flex',　//ここの宣言が必須
                    'altText':'this is a flex message',
                    //↓このcontentsの部分にSimulatorのJSONをコピー
                    
                    contents: {
                      "type": "bubble",
                        "hero": {
                        "type": "video",
                        "url": "https://youtube.com/shorts/iuWI1UltUJc?feature=share",
                        "previewUrl": "https://example.com/video_preview.jpg",
                        "altContent": {
                        "type": "image",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "url": "https://example.com/image.jpg"
                        },
                        "aspectRatio": "20:13"
                      },
                      "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                          {
                          "type": "text",
                          "text": "Brown Cafe",
                          "weight": "bold",
                          "size": "xl"
                          },
                          {
                          "type": "box",
                          "layout": "baseline",
                          "margin": "md",
                          "contents": [
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                              },
                              {
                              "type": "text",
                              "text": "4.0",
                              "size": "sm",
                              "color": "#999999",
                              "margin": "md",
                              "flex": 0
                              }
                          ]
                          },
                          {
                          "type": "box",
                          "layout": "vertical",
                          "margin": "lg",
                          "spacing": "sm",
                          "contents": [
                              {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                  "type": "text",
                                  "text": "Place",
                                  "color": "#aaaaaa",
                                  "size": "sm",
                                  "flex": 1
                                  },
                                  {
                                  "type": "text",
                                  "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                                  "wrap": true,
                                  "color": "#666666",
                                  "size": "sm",
                                  "flex": 5
                                  }
                              ]
                              },
                              {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                  "type": "text",
                                  "text": "Time",
                                  "color": "#aaaaaa",
                                  "size": "sm",
                                  "flex": 1
                                  },
                                  {
                                  "type": "text",
                                  "text": "10:00 - 23:00",
                                  "wrap": true,
                                  "color": "#666666",
                                  "size": "sm",
                                  "flex": 5
                                  }
                              ]
                              }
                          ]
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
                          "style": "link",
                          "height": "sm",
                          "action": {
                              "type": "uri",
                              "label": "CALL",
                              "uri": "https://linecorp.com"
                          }
                          },
                          {
                          "type": "button",
                          "style": "link",
                          "height": "sm",
                          "action": {
                              "type": "uri",
                              "label": "WEBSITE",
                              "uri": "https://linecorp.com"
                          }
                          },
                          {
                          "type": "spacer",
                          "size": "sm"
                          }
                      ],
                      "flex": 0
                      }
                  } //contensここまで コピペで持ってきたJSON
                  }
                ]
              };
              sendReplyMessage(payload);
          
        
        }
        else if('もんすと'== user_message||'モンスト'== user_message||'モンスターストライク'== user_message||'もんすたーすとらいく'== user_message)  {
            
          // payload を作る(ユーザー側に送るデータで特殊な型)
            let payload = {
                "replyToken" : REPLY_TOKEN,
                "messages" : [
                  {
                    'type':'flex',　//ここの宣言が必須
                    'altText':'this is a flex message',
                    //↓このcontentsの部分にSimulatorのJSONをコピー
                    
                    contents: {
                      "type": "bubble",
                      "hero": {
                      "type": "image",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                      "size": "full",
                      "aspectRatio": "20:13",
                      "aspectMode": "cover",
                      "action": {
                          "type": "uri",
                          "uri":  "https://www.monster-strike.com/"
                      }
                      },
                      "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                          {
                          "type": "text",
                          "text": "モンスターストライク",
                          "weight": "bold",
                          "size": "xl"
                          },
                          {
                          "type": "box",
                          "layout": "baseline",
                          "margin": "md",
                          "contents": [
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                              },
                              {
                              "type": "icon",
                              "size": "sm",
                              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                              },
                              {
                              "type": "text",
                              "text": "4.0",
                              "size": "sm",
                              "color": "#999999",
                              "margin": "md",
                              "flex": 0
                              }
                          ]
                          },
                          {
                          "type": "box",
                          "layout": "vertical",
                          "margin": "lg",
                          "spacing": "sm",
                          "contents": [
                              {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                  "type": "text",
                                  "text": "Place",
                                  "color": "#aaaaaa",
                                  "size": "sm",
                                  "flex": 1
                                  },
                                  {
                                  "type": "text",
                                  "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                                  "wrap": true,
                                  "color": "#666666",
                                  "size": "sm",
                                  "flex": 5
                                  }
                              ]
                              },
                              {
                              "type": "box",
                              "layout": "baseline",
                              "spacing": "sm",
                              "contents": [
                                  {
                                  "type": "text",
                                  "text": "Time",
                                  "color": "#aaaaaa",
                                  "size": "sm",
                                  "flex": 1
                                  },
                                  {
                                  "type": "text",
                                  "text": "10:00 - 23:00",
                                  "wrap": true,
                                  "color": "#666666",
                                  "size": "sm",
                                  "flex": 5
                                  }
                              ]
                              }
                          ]
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
                          "style": "link",
                          "height": "sm",
                          "action": {
                              "type": "uri",
                              "label": "Game With攻略",
                              "uri": "https://xn--eckwa2aa3a9c8j8bve9d.gamewith.jp/"
                          }
                          },
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
                          "type": "spacer",
                          "size": "sm"
                          }
                      ],
                      "flex": 0
                      }
                  } //contensここまで コピペで持ってきたJSON
                  }
                ]
              };
              sendReplyMessage(payload);
          }   
        }
    }
  
    else if(EVENT_TYPE === "postback"){     // ポストバックイベントの場合
            const PB_DATA = event.postback.data;  // ポストバックデータ
            // payload を作る(ユーザー側に送るデータ)
            let payload = {
              'replyToken': REPLY_TOKEN,　//特定の相手に返信するためのトークン
              'messages': [{
                "type": "postback",
                "label": "num",
                "data": "1",
                "displayText": reply_messages,
                "inputOption": "openKeyboard",
              }]
          };
  }
}
// ここはユーザー側にbotから返信している
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