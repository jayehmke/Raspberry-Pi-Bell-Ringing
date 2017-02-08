var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var SendSlackMessage = require('./lib/slack');

var Gpio = require('pigpio').Gpio,
  motor = new Gpio(11, {mode: Gpio.OUTPUT}),
  pulseWidth = 1000,
  increment = 100;

setInterval(function () {
  motor.servoWrite(pulseWidth);

  pulseWidth += increment;
  if (pulseWidth >= 2000) {
    increment = -100;
  } else if (pulseWidth <= 1000) {
    increment = 100;
  }
}, 1000);

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

io.socket.on('user', function(user) {


  console.log('user', user)

  if (user.verb === 'created') {

    SendSlackMessage(user.data.name);

  }

});

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://192.168.4.97:1337';
// ...

// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/user', function serverResponded (body, JWR) {
  // body === JWR.body
  // console.log('Sails responded with: ', body);
  // console.log('with headers: ', JWR.headers);
  // console.log('and with status code: ', JWR.statusCode);

  // ...
  // more stuff
  // ...


  // When you are finished with `io.socket`, or any other sockets you connect manually,
  // you should make sure and disconnect them, e.g.:
  // io.socket.disconnect();

  // (note that there is no callback argument to the `.disconnect` method)
});

