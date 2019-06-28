
const request = require("request");

//send message to output messenger
function sendOutput(message) {
  payload = {
    notify: 1, 
    from: "PRTG",
    room: "monitoring", 
    message:message
  }
  request.post({
    url: "http://192.168.1.8:14125/api/notify",
    qs: payload,
    headers: { "API-KEY": "G3H3E1HEV385M5FU72CUWA414TT6TD45" },
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
