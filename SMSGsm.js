var SerialPort = require("serialport");

var port = '';

port = "COM4"; // as per the modem installed on port
function sendSms(phone, message, callback) {
    var serialPort = new SerialPort(port, {
        baudRate: 38400, dataBits: 8, parity: 'none', stopBits: 1, flowControl: false

    });

    serialPort.on('error', function (err) {
        console.log(err);
    });
    serialPort.on("open", function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Serial communication open');

            // AT^SYSCFG=mode, order, band, roaming, domain
            // mode(2): Automatic search; order(2): 3G first, then 2G;
            // band(3FFFFFFF): Any band; roaming(2): No change; domain(4): No change

            serialPort.write("AT^SYSCFG=2,2,3FFFFFFF,2,4");
            serialPort.write('\r');

            //serialPort.on('data', function (data) {
            // console.log("Received data: " + data);
            //}); 

            sending_sms_gsm(serialPort, message, phone);

            var tempFunc = setInterval(function () {
                serialPort.close();
                newFunc();
            }, 10000);

            var newFunc = function () {
                clearInterval(tempFunc);
            }
        }
    });
    function sending_sms_gsm(serial, mymsg, mynum) {

        serial.write("AT+CMGF=1");
        serial.write('\r');
        serial.write("AT+CMGS=\"");
        serial.write(mynum);
        serial.write('"')
        serial.write('\r');
        serial.write(mymsg);
        serial.write(new Buffer([0x1A]));
        serial.write('ctrl^z');
        console.log("serial: ",serial)
        callback("callback")
    }
}
module.exports = { sendSms }

