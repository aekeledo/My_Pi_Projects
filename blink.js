var onoff = require('onoff');

//variables
var Gpio = onoff.Gpio,
  led = new Gpio(4, 'out'),
  interval;

interval = setInterval(function(){
  var value = (led.readSync() +1 ) % 2;
  led.write(value, function() {
    console.log('Changed LED state to: ' + value);
  });
}, 2000);

// control c shuts off code
process.on ('SIGINT', function(){
  clearInterval(interval); // cancels setInterval
  led.writeSync(0); // turn light off
  led.unexport(); // close the GPI0 pin
  console.log('Bye bye');
  process.exit();
})
