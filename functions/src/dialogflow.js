
const { onRequest, } = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const dialogflow = require('../util/dialogflow.util');
const flexOrder = require('../flex/order');

exports.webhook = onRequest(async (request, response) => {

  if (request.method !== "POST") {
    return response.send(request.method);
  }

  const events = request.body.events
  for (const event of events) {

    if (event.type === "message" && event.message.type === "text") {

      await dialogflow.postToDialogflow(request)
      return response.end();
    }

  }

  return response.end();

});

exports.fulfillment = onRequest(async (request, response) => {

  if (request.body.originalDetectIntentRequest.source === "line") {
    const replyToken = request.body.originalDetectIntentRequest.payload.data.replyToken
    const userId = request.body.originalDetectIntentRequest.payload.data.source.userId
    const flex_oder = await flexOrder.order(userId, request.body.queryResult.parameters.menu)


    console.log("replyToken", replyToken);
    console.log("userId", userId);
    console.log("flex_oder", flex_oder);

    await line.reply(replyToken, [flex_oder])
  }
   return response.end();

});