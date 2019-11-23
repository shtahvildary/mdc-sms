var sendMsg = require('./sendMsg')
const fs = require('fs');
const dir = "./dir/Queue";

var watch = require('node-watch')
var watcher = watch(dir, { recursive: true, persistent: true }, function (evt, name) { });
watcher
    .on('change', function (name, path) {
        // .on('add', function (path) {
        // addCounter++
        if (name == 'update') {
            // if (addCounter > initCount) {

            var logFile = fs.readFileSync(path, { encoding: "utf-8" })

            var log = parseLog(logFile)
            var message = `با سلام. خطای زیر رخ داده است لطفا بررسی نمایید:\n${log.device} :\nNew Status: ${log.newStatus}`
            message+=`Date: ${log.date}`

            sendMsg.sendOutput(message)
            // sendMsg.diafaan(message)
        }
    })


function parseLog(log) {
    var temp = log.slice(log.search("Subject: ") + 9)
    var subject = temp.slice(0, temp.search("\n"))

    temp = log.slice(log.search("Device: ") + 8)
    var device = temp.slice(0, temp.search(" "))
    
    temp=log.slice(log.search("New Status: ")+12)
    var newStatus=temp.slice(0,temp.search("\n"))
        
    temp = log.slice(log.search("Date/Time: ")+11 )
    var date = temp.slice(0, temp.search("\n"))
   
    return { subject, device,date,newStatus }
}
