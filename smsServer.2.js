const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');




var chokidar = require('chokidar');
var modem = require("sms-gsm");

/* Change to port */
// var m1 = new modem.Modem_text("/dev/tty.usbserial-A600aL36");

const port = process.argv[2] || 9000;
http.createServer(function (req, res) {
    
    var watcher = chokidar.watch('./dir', { ignored: /^\./, persistent: true });
watcher
    .on('add', function (path) {
        console.log('File', path, 'has been added');
        // m1.sendMessage(09122005639, "hi", (err, res) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("message has sent!")
        //     }
        // });
    })



//https://github.com/agathauy/sms-gsm

/* To always re-open port in case of disconnect */
// var open_port = setInterval(() => {
//     m1.open((status) => {
//         if (status == true) {
//             console.log("Port is open");
//             clearInterval(open_port);
//         } else {
//             console.log("in else");
//             console.log(status);
//         }
//     });
// }, 3000);

// m1.eventEmitter.on('new message', (num, text) => {
//     console.log("New message:");
//     console.log(num);
//     console.log(text);

//     var msg = text.trim().split(/\s+/);
//     if (msg.toUpperCase() == "HELLO") {
//         var reply = "Hi";
//         m1.sendMessage(num, reply, (err, res) => {
//             if (err) {
//                 console.log(err);
//             } else {

//             }
//         });
//     }
// });


// http.createServer(function (req, res) {
//   console.log(`${req.method} ${req.url}`);
//   // parse URL
//   const parsedUrl = url.parse(req.url);
//   var folder;
//   var fileIndex=req.url;
//   fileIndex=fileIndex.slice(fileIndex.lastIndexOf(".")+1)
//   // extract URL path
//   // let pathname = __dirname + "/files/videos" +parsedUrl.pathname;
//   // let pathname = __dirname + "/files/photos" +parsedUrl.pathname;

//   // let pathname = `.${parsedUrl.pathname}`;

//   // maps file extention to MIME types
//   const mimeType = {
//     '.ico': 'image/x-icon',
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',

//     '.wav': 'audio/wav',
//     '.mp3': 'audio/mpeg',

//     '.pdf': 'application/pdf',
//     '.doc': 'application/msword',

//     '.ogg':'video/ogg',
//     '.mp4':'video/mp4'
//   };

//   let pathname = "./file" +parsedUrl.pathname;
//   // let pathname = __dirname + "/files" +parsedUrl.pathname;

//   fs.exists(pathname, function (exist) {
//     if(!exist) {
//       // if the file is not found, return 404
//       res.statusCode = 404;
//       res.end(`File ${pathname} not found!`);
//       return;
//     }
//     // // if is a directory, then look for index.html
//     // if (fs.statSync(pathname).isDirectory()) {
//     //   pathname += '/index.html';
//     // }
//     // read file from file system
//     fs.readFile(pathname, function(err, data){
//       if(err){
//         res.statusCode = 500;
//         res.end(`Error getting the file: ${err}.`);
//       } else {
//         // based on the URL path, extract the file extention. e.g. .js, .doc, ...
//         const ext = path.parse(pathname).ext;
//         // if the file is found, set Content-type and send data
//         res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
//         res.end(data);
//       }
//     });
//   });
}).listen(parseInt(port));
// console.log(`Download Server listening on port ${port}`);