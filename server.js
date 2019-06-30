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
            console.log('path: ', path);
            console.log('name: ', name);

            var logFile = fs.readFileSync(path, { encoding: "utf-8" })

            var log = parseLog(logFile)
            var message=`Machine ${log.name} : ${log.message}`
            sendMsg.sendOutput(message)
            smsGsm.sendSms("09122005639", "hi", (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("message has sent!")
                }
            })
            // if you want to send sms uncomment this line:
            // sendMsg.sms(message)

        }
    })



function parseLog(log) {
    console.log('log: ',log)
    return { name: "test", message: "just for test" }
}
