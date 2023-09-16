const axios = require("axios");

const LINE_MESSAGING_API = process.env.LINE_MESSAGING_API;
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

const LINE_NOTIFY_API = process.env.LINE_NOTIFY_API
const LINE_NOTIFY = process.env.LINE_NOTIFY

const LINE_HEADER = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
};

exports.pushLineNotify = async (message) => {
  const FormData = require('form-data');
  let data = new FormData();
  data.append('message', message);
  return await axios({
    method: 'post',
    maxBodyLength: Infinity,
    url: `${LINE_NOTIFY_API}`,
    headers: {
      'Authorization': `Bearer ${LINE_NOTIFY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })

};

exports.getProfile = async (userId) => {
  return await axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: `${LINE_MESSAGING_API}/profile/${userId}`,
    headers: LINE_HEADER,
  })

};


exports.reply = (token, payload) => {
  return axios({
    method: "post",
    url: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    data: JSON.stringify({
      replyToken: token,
      messages: payload
    })
  });
};