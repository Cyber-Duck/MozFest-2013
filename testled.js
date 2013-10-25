
/**
 * Test LED
 *
 * @description :: Strobe the LED on pin 13
 * 
 */

	// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
	// JOHNNY FIVE - Arduino config

	// Load johnny-five module
	var five = require("johnny-five");
	
	// Create a Board object
	var board = new five.Board();
	
	board.on("ready", function() {
	  // When the board is ready
	  // Create Led object on pin 13
	  var led = new five.Led(13);
	  // Strobe - Optionally set the speed; defaults to 100ms
	  led.strobe();
	});

