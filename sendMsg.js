
const request = require("request");

//send message to output messenger
function sendOutput(message) {
  payload = {
    notify: 1, 
    from: "PRTG",
    room: "MonitoringMC", 
    message:message
  }
  request.post({
    url: "http://172.16.16.137:14125/api/notify",
    qs: payload,
    headers: { "API-KEY": "UQ4HX65AHR6W8VM68Y86228XX3D784SB" },
  }, function (err, response, body) {
    console.log("error", err)
    console.log("body", body)
  });
}

//send SMS to an sms panel
function sms(message) {
  payload = {
    TEXT:message,
    to: "*****",
    FROM: "*****",
    USERNAME: "*****",
    PASSWORD: "*****",
    DOMAIN: "0098",
  }
  request.post({
    url: "http://www.0098sms.com/sendsmslink.aspx",
    qs: payload
  },
    function (err, response, body) {
      console.log("error", err)
    }
  )
}


module.exports = { sendOutput, sms }
