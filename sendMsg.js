
const request = require("request");

//send message to output messenger
function sendOutput(message) {
  payload = {
    notify: 1, 
    from: "PRTG",
    // room: "MonitoringMC", 
    room: "testMSG", 
    message:message
  }
  request.post({
    url: "http://172.16.16.137:14125/api/notify",
    qs: payload,
    headers: { "API-KEY": "UQ4HX65AHR6W8VM68Y86228XX3D784SB" },
  }, function (err, response, body) {
    if(err) console.log("output messenger error", err)
    else console.log("output messenger body:", body)
  });
}
//send SMS to an Diafaan SMS Server
function diafaan(message) {
  payload = {
    "username":"mdc",
    "password": "123@abc",
    // "to":phoneNum, 
    "contact-name":"testMSG",
    // "contact-name":"MonitoringMC",
    "message-type":"sms.automatic",
    "message":message
  }
  request.get(
    {
    url: "http://172.16.17.195:9710/http/send-message",
    qs:payload  
  }
  , function (err, response, body) {
    if(err) console.log("Diafaan error", err)
    else console.log("Diafaan body:", body)
  });
}

module.exports = { sendOutput,diafaan }
