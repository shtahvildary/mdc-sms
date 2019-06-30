var sendMsg = require('./sendMsg')
var smsGsm=require('./SMSGsm')
const fs = require('fs');
const dir = "./dir";
// var chokidar = require('chokidar');
// var watcher = chokidar.watch(dir, { ignored: /^\./, persistent: true });
var watch =require('node-watch')

var files = fs.readdirSync(dir);
var initCount = files.length
var addCounter = 0;


var watcher=watch(dir, { recursive: true ,persistent: true}, function(evt, name) {});
watcher
    .on('change', function (name,path) {
        // .on('add', function (path) {
        addCounter++
        if(name=='update'){
        // if (addCounter > initCount) {
            
            var logFile = fs.readFileSync(path, { encoding: "utf-8" })

            var log = parseLog(logFile)
            var message=`Machine ${log.device} : ${log.newStatus}`
            console.log("message: ",message)

            sendMsg.sendOutput(message)

            // smsGsm.sendSms("09122005639", "hi", (err, res) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log("message has sent!")
            //     }
            // })

            // if you want to send sms uncomment this line:
            // sendMsg.sms(message)

        }
    })


function parseLog(log) {
var temp=log.slice(log.search("Subject: ")+9)
   var subject= temp.slice(0,temp.search("\n"))
    temp=log.slice(log.search("Device: ")+8)
    var device=temp.slice(0,temp.search(" "))
    temp=log.slice(log.search("New Status: ")+12)
    var newStatus=temp.slice(0,temp.search("\n"))

    return{device,newStatus}
}
