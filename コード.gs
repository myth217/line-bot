var CHANNEL_ACCESS_TOKEN = "/HmGBFLZOT7Yw4a7osv0TkWD3oUb38J1hWC0coxeQfu9s7+Dl8IcbERB0Cs0pc17TM670Uy//OsQ6xojmy9unxyxoc0Irb/p6SWkyhyiazYTHVlHTZc7SZDI0zCC+aLRu3vp42VXT65Eo8rwGepGpQdB04t89/1O/w1cDnyilFU=";
var ERROR_SHEET_ID = "1fOclsOdsIg0FPBXYaWd3jNMDX2pUhRDuRGTTk10MUg4";

//日付、時刻のフォーマット設定
var dateExp = /(\d{2})\/(\d{2})\s(\d{2}):(\d{2})/;
var dayExp = /(\d+)[\/月](\d+)/;
var hourMinExp = /(\d+)[:時](\d+)*/;


function doPost(e) {
  try {
    handleMessage(e);
  } catch(error) {
    logging("ToCalendarFromLineBot");
    logging(JSON.stringify(e));
    logging(JSON.stringify(error));
    var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
    reply(replyToken, error.message);
  }
}


function logging(str) {
  var sheet = SpreadsheetApp.openById("1fOclsOdsIg0FPBXYaWd3jNMDX2pUhRDuRGTTk10MUg4").getActiveSheet();
  var ts = new Date().toLocaleString("japanese", {timeZone: "Asia/Osaka"});
  sheet.appendRow([ts, str]);
}

function handleMessage(e) {
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  var lineType = JSON.parse(e.postData.contents).events[0].type
  if (typeof replyToken === "undefined" || lineType === "follow") {
    return;
  }
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  var cache = CacheService.getScriptCache();
  var type = cache.get("type");

  if (type === null) {
    if (userMessage === "予定追加") {
      cache.put("type", 1);
      reply(replyToken, "予定日を教えてください！\n「06/17, 6月17日」などの形式なら大丈夫です！");
    } else if (userMessage === "一週間の予定確認") {
      reply(replyToken, getEventss());
    } else {
      reply(replyToken, "リッチメニューの「予定追加」で予定追加を、「一週間の予定確認」で一週間の予定参照ができるので気軽に話しかけてくださいね！");
    }
  } else {
    if (userMessage === "キャンセル") {
      cache.remove("type");
      reply(replyToken, "キャンセルしました！");
      return;
    }

    switch(type) {
      case "1":
        // 予定日
        var [matched, month, day] = userMessage.match(dayExp); //dayexpの型に合う文字列を取り出す。
        cache.put("type", 2);
        cache.put("month", month);
        cache.put("day", day);
        reply(replyToken, month + "/" + day + "ですね！　次に開始時刻を教えてください。「13:00, 13時, 13:20, 13時20分」などの形式なら大丈夫です！");
        break;

      case "2":
        // 開始時刻
        var [matched, startHour, startMin] = userMessage.match(hourMinExp);
        cache.put("type", 3);
        cache.put("start_hour", startHour);
        if (startMin == null) startMin = "00";
        cache.put("start_min", startMin);
        reply(replyToken, startHour + ":" + startMin + "ですね！　次に終了時刻を教えてください。");
        break;

      case "3":
        // 終了時刻
        var [matched, endHour, endMin] = userMessage.match(hourMinExp);
        cache.put("type", 4);
        cache.put("end_hour", endHour);
        if (endMin == null) endMin = "00";
        cache.put("end_min", endMin);
        reply(replyToken, endHour + ":" + endMin + "ですね！　最後に予定名を教えてください！");
        break;

      case "4":
        // 予定名
        cache.put("type", 5);
        cache.put("title", userMessage);
        var [title, startDate, endDate] = createEventData(cache);
        reply(replyToken, toEventFormat(title, startDate, endDate) + "\nで間違いないでしょうか？ よろしければ「はい」をやり直す場合は「いいえ」をお願いいたします！");
        break;

      case "5":
        // 確認の回答がはい or いいえ
        cache.remove("type");
        if (userMessage === "はい") {
          var [title, startDate, endDate] = createEventData(cache);
          CalendarApp.getDefaultCalendar().createEvent(title, startDate, endDate);
          reply(replyToken, "追加しました！\nお疲れ様でした！");
        } else {
          reply(replyToken, "お手数ですがもう一度お願いいたします！");
        }
        break;
      default:
        reply(replyToken, "申し訳ありません。\n形式に誤りがないか確認してみて、なければ「キャンセル」で予定入力をキャンセルすることができるので、そちらを試していただけますか？");
        break;
    }
  }
}

function createEventData(cache) {
  var year = new Date().getFullYear();
  var title = cache.get("title");
  var startDate = new Date(year, cache.get("month") - 1, cache.get("day"), cache.get("start_hour"), cache.get("start_min"));
  var endDate = new Date(year, cache.get("month") - 1, cache.get("day"), cache.get("end_hour"), cache.get("end_min"));
  return [title, startDate, endDate];
}

function toEventFormat(title, startDate, endDate) {
  var start = Utilities.formatDate(startDate, "JST", "MM/dd HH:mm");
  var end = Utilities.formatDate(endDate, "JST", "MM/dd HH:mm");
  var str = title + ": " + start + " ~ " + end;
  return str;
}

function reply(replyToken, message) {
  var url = "https://api.line.me/v2/bot/message/reply";
  UrlFetchApp.fetch(url, {
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    "method": "post",
    "payload": JSON.stringify({
      "replyToken": replyToken,
      "messages": [{
        "type": "text",
        "text": message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({"content": "post ok"})).setMimeType(ContentService.MimeType.JSON);
}





function get_Calendar() {
  var arrCals=[];
  arrCals.push(CalendarApp.getCalendarById('yoshisukabuburayam@gmail.com'));
  return arrCals;
}

//1週間の予定を取得するメインの関数
function get_Week_Schedule(){
  var arrCals = get_Calendar();
  var dateNow = new Date();
  var date = new Date();
  var strBody ='';
  var tmpBody ='';
  var strIntro = "おつかれさまです。\n1週間の予定です。\n" ;
  for (var j = 1; j < 7 ; j++ ){
    date.setDate(dateNow.getDate()+j);
    for (var i = 0 ; i < arrCals.length ; i++){
      tmpBody = tmpBody + getEvents(arrCals[i],date);
    }
    if (tmpBody){
      strBody = strBody + date.getDate() + '日\n' + tmpBody;
    }
    tmpBody = '';
  }
  return (strIntro + strBody);


}

//予定を取得する関数
function getEvents(Cals,getDate){
　var arrEvents = Cals.getEventsForDay(getDate);//カレンダーの予定取得
  var strEvents ='';
  for (var i=0; i<arrEvents.length; i++){
    var strTitle = arrEvents[i].getTitle();
    var strStart = _HHmm(arrEvents[i].getStartTime());
    var strEnd = _HHmm(arrEvents[i].getEndTime());
    if (strStart == strEnd){
      strEvents = strEvents + '終日イベント：' + strTitle +  '\n';
    }else{
      strEvents = strEvents + strStart + '～' + strEnd+ '：'  + strTitle  + '\n';
    }
  }
  return strEvents;
}

//予定確認時の関数
function getEventss() {
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(new Date());
  var body;

  if (events.length === 0) {
    body = "今週の予定はありません!";
    return body;
  } else {
    body = get_Week_Schedule();
    return body;
  }

}

function toHHmm(date){
  return Utilities.formatDate(date, "JST", "HH:mm");
}

function _HHmm(str){
  return Utilities.formatDate(str,'JST','HH:mm');
}
