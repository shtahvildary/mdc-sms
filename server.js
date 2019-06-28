var sendMsg = require('./sendMsg')
const fs = require('fs');
const dir = "./dir";
var chokidar = require('chokidar');
var watcher = chokidar.watch(dir, { ignored: /^\./, persistent: true });
var files = fs.readdirSync(dir);
var initCount = files.length
var addCounter = 0;

watcher
    .on('add', function (path) {
        addCounter++
        console.log('File', path, 'has been added');
        if (addCounter > initCount) {
            var logFile = fs.readFileSync(path, { encoding: "utf-8" })

            var log = parseLog(logFile)
            var message=`Machine ${log.name} : ${log.message}`
            sendMsg.sendOutput(message)
            // if you want to send sms uncomment this line:
            // sendMsg.sms(message)
        }
    })



function parseLog(log) {

    return { name: "test", message: "I'm dead." }
}
