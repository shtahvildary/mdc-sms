var modem = require("sms-gsm");

var m1 = new modem.Modem_text("/dev/tty.usbserial-A600aL36");

/* To always re-open port in case of disconnect */
var open_port = setInterval(() => {
    m1.open((status) => {
        if (status == true) {
            console.log("Port is open");
            clearInterval(open_port);
        } else {
            console.log("in else");
            console.log(status);
        }
    });
}, 3000);

require('chokidar').watch('./dir', {
    ignored: /node_modules|\.git/,
    persistent: true,
    // followSymlinks: false,
    // useFsEvents: false,
    // usePolling: false
  }).on('add', function(event, path) {
    console.log(event, path);
    m1.sendMsg("09122005639", "hi", (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("message has sent!")
            }
        });
  }).on('ready', function() {
    console.log('Ready');
  })