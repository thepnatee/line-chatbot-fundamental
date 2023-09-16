const { onRequest, } = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const flex_unix_time = require('../flex/unix_time');

exports.basic = onRequest(async (request, response) => {

  
  if (request.method !== "POST") {
    return response.send(request.method);
  }

  const events = request.body.events
  for (const event of events) {
    console.log(JSON.stringify(event));

    if (event.type === "follow") {
        await line.reply(event.replyToken, [{
          "type": "text",
          "text": "Welcome",
          "sender": {
            "name": "พนักงานต้อนรับ",
            "iconUrl": "https://cdn-icons-png.flaticon.com/128/1211/1211059.png"
          },
          "quickReply": {
            "items": [
                {
                    "type": "action",
                    "imageUrl": "https://example.com/sushi.png",
                    "action": {
                        "type": "message",
                        "label": "Sushi",
                        "text": "Sushi"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "camera",
                        "label": "Camera"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "cameraRoll",
                        "label": "cameraRoll"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "location",
                        "label": "Send location"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "uri",
                        "label": "Phone order",
                        "uri": "tel:0981626369"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "uri",
                        "label": "Recommend to friends",
                        "uri": "https://line.me/R/nv/recommendOA/@linedevelopers"
                    }
                }
            ]
        }

        }])
    }


    if (event.type === "message" && event.message.type === "text") {

      if (event.message.text === "demo") {

        await line.reply(event.replyToken, [{
          "type": "text",
          "text": "Hello, world1",
          "sender": {
              "name": "Bot",
              "iconUrl": "https://stickershop.line-scdn.net/stickershop/v1/sticker/51626526/ANDROID/sticker.png"
          }
      },
      {
          "type": "text",
          "text": "Hello, world2"
      },
      {
          "type": "text",
          "text": "$ Hello Thepnatee $",
          "emojis": [
              {
                  "index": 0,
                  "productId": "5ac1bfd5040ab15980c9b435",
                  "emojiId": "001"
              },
              {
                  "index": 18,
                  "productId": "5ac1bfd5040ab15980c9b435",
                  "emojiId": "082"
              }
          ]
      },
      {
          "type": "text",
          "text": "\uDBC0\uDC84 LINE original emoji"
      },
      {
          "type": "location",
          "title": "my location",
          "address": "1-6-1 Yotsuya, Shinjuku-ku, Tokyo, 160-0004, Japan",
          "latitude": 35.687574,
          "longitude": 139.72922
      }])

      }
      if (event.message.text === "demo2") {

        await line.reply(event.replyToken, [{
          "type": "text",
          "text": "Demo Quote Message",
          "quoteToken": event.message.quoteToken
        }])

      }
    }

  }

  return response.end();

});

exports.group = onRequest(async (request, response) => {

  // This Funstion use Method POST
  if (request.method !== "POST") {
    return response.send(request.method);
  }

  const events = request.body.events
  for (const event of events) {
    console.log(JSON.stringify(event));

    if (event.source.type !== "group") {
      return response.end();
    }

    if (event.type === "join") {

      await line.reply(event.replyToken, [{
        "type": "text",
        "text": "Hello, Group"
      }])
      console.log(JSON.stringify(event));

    }
    if (event.type === "leave") {

      console.log(JSON.stringify(event));
    }
    if (event.type === "memberJoined") {
     
      console.log(JSON.stringify(event));

    }
    if (event.type === "memberLeft") {
     
      console.log(JSON.stringify(event));

    }

  }

  return response.end();

});

exports.unix_time = onRequest(async(request, response) => {

  if (request.method !== "POST") {
    return response.send(request.method);
  }

  const currentTimeStamp = Math.floor(Date.now() / 1000)

  const events = request.body.events
  for (const event of events) {
     
    if (event.type === "message" && event.message.type === "text") {

      if (event.message.text === "flex") {
        // adds 1 minute
        const flex = await flex_unix_time.unix_time(currentTimeStamp + 60 );
        await line.replyShortLived(event.replyToken,[flex])
      }

    }else if(event.type === "postback"){
      const expireTime = event.postback.data
      let message = (currentTimeStamp > expireTime) ?  "❌ Time Out" : "✅ In Time"
      await line.reply(event.replyToken,[{
        "type": "text",
          "text": message
      }])

      return response.end()



    }

  }

  return response.end();

});