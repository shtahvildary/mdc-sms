var SerialPort = require("serialport");

var port = '';

port = "COM3"; // as per the modem installed on port
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

            serialPort.write("AT+SYSCFG=2,2,3FFFFFFF,2,4");
            serialPort.write('\r');
            
            serialPort.write("AT+CGMI");

            serialPort.on('data', function (data) {
            console.log("Received data: " + data);
            }); 

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
        /*
https://talk.patoghu.com/showthread.php?t=195763
        
AT
OK
AT+CMGF=1
OK
AT+CMGW="+989353659299"
> A simple demo of SMS text messaging.
+CMGW: 1

OK
AT+CMSS=1
+CMSS: 20



*/

        var temp=serial.write("AT+CMGF=1");  //Message format 0:PDU, 1:text
        console.log('AT+CMGF: ',temp)
        serial.write('\r');
        serial.write("AT+CMGS=\""); //send message
        console.log('AT+CMGS: ',temp)

        serial.write(mynum);
        console.log('mynum: ',temp,",",mynum)

        serial.write('"')
        serial.write('\r');
        serial.write(mymsg);
        console.log('mymsg: ',temp,",",mymsg)

        serial.write(new Buffer.alloc(0x1A));
        console.log('Buffer: ',temp)

        serial.write('ctrl^z');
        console.log('ctrl^z: ',temp)
        
       
        // console.log("serial: ",serial)
        callback("callback")
        
    }
}
module.exports = { sendSms }

