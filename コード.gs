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

  else if(EVENT_TYPE === "message"){   //メッセージであった場合
          // メッセージイベントの場合
      if(event.message.type === "text"){    // メッセージでなおかつテキストであった場合
        let user_message = event.message.text;      // 受け取ったテキスト
            function isNum(val){
              return !isNaN(val)
            }

          let num_check = isNum(user_message);

          // 数値かどうか
          // 現状は数値であった場合、どんな状態でもここを通る
          // 数値でなかった場合 下の else ifに到達する
          // それを最後まで繰り返す
          if(num_check == true) {
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
          else if ('カレンダー' == user_message) {
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

                          // ---------------------予定追加--------------------------------------
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

                          //-------------------------- 予定確認----------------------------------------
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
                          // --------------------------割り勘--------------------------------------
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
          else if('メニュー' == user_message) {
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

                          // ---------------------モンスト--------------------------------------
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

                          //-------------------------- ひろゆき----------------------------------------
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "text": "ひろゆき",
                            "label": "ひろゆき"
                          }
                        },
                        {
                          // --------------------------割り勘--------------------------------------
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
                          // --------------------------カレンダー--------------------------------------
                          "type": "button",
                          "style": "primary",
                          "height": "sm",
                          "action": {
                            "type": "message",
                            "label": "カレンダー",
                            "text": "カレンダー"
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
          else if('モンスト'== user_message)  {
              
            // payload を作る(ユーザー側に送るデータで特殊な型)
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
                        // "body": {
                        // "type": "box",
                        // "layout": "vertical",
                        // "contents": [
                        //     {
                        //     "type": "text",
                        //     "text": "モンスターストライク",
                        //     "weight": "bold",
                        //     "size": "xl"
                        //     },
                        //     {
                        //     "type": "box",
                        //     "layout": "baseline",
                        //     "margin": "md",
                        //     "contents": [
                        //         {
                        //         "type": "icon",
                        //         "size": "sm",
                        //         "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        //         },
                        //         {
                        //         "type": "icon",
                        //         "size": "sm",
                        //         "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        //         },
                        //         {
                        //         "type": "icon",
                        //         "size": "sm",
                        //         "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        //         },
                        //         {
                        //         "type": "icon",
                        //         "size": "sm",
                        //         "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                        //         },
                        //         {
                        //         "type": "icon",
                        //         "size": "sm",
                        //         "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                        //         },
                        //         {
                        //         "type": "text",
                        //         "text": "4.0",
                        //         "size": "sm",
                        //         "color": "#999999",
                        //         "margin": "md",
                        //         "flex": 0
                        //         }
                        //     ]
                        //     },
                        //     {
                        //     "type": "box",
                        //     "layout": "vertical",
                        //     "margin": "lg",
                        //     "spacing": "sm",
                        //     "contents": [
                        //         {
                        //         "type": "box",
                        //         "layout": "baseline",
                        //         "spacing": "sm",
                        //         "contents": [
                        //             {
                        //             "type": "text",
                        //             "text": "Place",
                        //             "color": "#aaaaaa",
                        //             "size": "sm",
                        //             "flex": 1
                        //             },
                        //             {
                        //             "type": "text",
                        //             "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                        //             "wrap": true,
                        //             "color": "#666666",
                        //             "size": "sm",
                        //             "flex": 5
                        //             }
                        //         ]
                        //         },
                        //         {
                        //         "type": "box",
                        //         "layout": "baseline",
                        //         "spacing": "sm",
                        //         "contents": [
                        //             {
                        //             "type": "text",
                        //             "text": "Time",
                        //             "color": "#aaaaaa",
                        //             "size": "sm",
                        //             "flex": 1
                        //             },
                        //             {
                        //             "type": "text",
                        //             "text": "10:00 - 23:00",
                        //             "wrap": true,
                        //             "color": "#666666",
                        //             "size": "sm",
                        //             "flex": 5
                        //             }
                        //         ]
                        //         }
                        //     ]
                        //     }
                        // ]
                        // },
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
                              // ---------------------モンスト--------------------------------------
                              "type": "button",
                              "style": "link",
                              "height": "sm",
                              "action": {
                                "type": "message",
                                "label": "-Game With-検索",
                                "text": "-Game With-検索"
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
          else if ('割り勘' == user_message) {
            reply_messages = '金額を入力してください';
            let payload = {
              'replyToken': REPLY_TOKEN,　//特定の相手に返信するためのトークン
              'messages': [{
              'type': 'text',             //返信のタイプ
              'text': reply_messages    //内容
              }]
            };


            sendReplyMessage(payload);

          }
          else if ('-Game With-検索' == user_message) {
            reply_messages = '検索したい内容を入力してください';
            let payload = {
              'replyToken': REPLY_TOKEN,　//特定の相手に返信するためのトークン
              'messages': [{
              'type': 'text',             //返信のタイプ
              'text': reply_messages    //内容
              }]
            };


            sendReplyMessage(payload);

          }     
          // メッセージのそれ以外 
          // else {
          //   reply_messages = '「' + user_message + '」ってこと！？';
          //   let payload = {
          //     'replyToken': REPLY_TOKEN,//特定の相手に返信するためのトークン
          //     'messages': [{
          //     'type': 'text',             //返信のタイプ
          //     'text': reply_messages     //内容
          //     }]
          //   };
          //   //payloadを渡す
          //   sendReplyMessage(payload);
          // }

      }
  }

  else if(EVENT_TYPE === "postback"){     // ポストバックイベントの場合
            const PB_DATA = event.postback.data;  // ポストバックデータ
            // payload を作る(ユーザー側に送るデータ)
            let payload = {
              'replyToken': REPLY_TOKEN,//特定の相手に返信するためのトークン
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