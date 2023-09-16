
const axios = require("axios");

exports.postToDialogflow = async (req) => {
  req.headers.host = "dialogflow.cloud.google.com";
  return axios({
    url: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${process.env.DIALOGFLOW_AGENT_ID}`,
    headers: req.headers,
    method: "post",
    data: req.body
  });
};
