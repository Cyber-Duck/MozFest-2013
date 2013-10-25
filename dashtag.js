
/**
 * Dashtag
 *
 * @description :: Link between web application and Arduino board
 * 
 */

	// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
	// MAIN SETUP
	
	// Display a twet every FREQUENCY ms
	var FREQUENCY = 180000; // 3 minutes
	// Execution speed of the app
	var SPEED = 80; 
	// Hashtag
	var HASHTAG = "mozfest";

	
	// BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
	// REQUEST - Server config

	// Load request module
	var request = require("request");
	var server_url="http://mozfest.cyberduck.net";


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
	


/**
 * Morse
 *
 * @description :: get an action (0, 1 or 2) and control the LED
 * 
 */
function morse(action) {
	
	switch(action) {
		
		case 0:
			process.stdout.write(" ");
		break;
		
		case 1:
			process.stdout.write(".");
			led.on();
			setTimeout(function(){ led.off(); }, SPEED);
		break;
			
		case 2:
			process.stdout.write("-");
			led.on();
			setTimeout(function(){ led.off(); }, SPEED*5);
		break;
			
	}
}

	
/**
 * tweetToMorse
 *
 * @description	:: Querry the server, returns an array of actions or false, process the array
 * 
 * EXAMPLE JSON RECEIVED
 * {
 * 	"hashtag":"benjamin",
 *  "tweet":"Wednesdays are my Fridays #Benjamin \ud83d\ude0d",
 *  "morse":".-- . -.. -. . ... -.. .- -.-- ... .- .-. . -- -.-- ..-. .-. .. -.. .- -.-- ... -... . -. .--- .- -- .. -. .-.-.",
 *  "chars":[".--",".","-..","-.",".","...","-..",".-","-.--","..."," ",".-",".-.","."," ","--","-.--"," ","..-.",".-.","..","-..",".-","-.--","..."," ","-...",".","-.",".---",".-","--","..","-."," ",".-.-."],
 *  "digits":[1,2,2,1,2,1,1,2,1,1,1,1,1,2,1,1,1,2,2,1,2,2,1,1,1,0,0,0,1,2,1,2,1,1,0,0,0,2,2,2,1,2,2,0,0,0,1,1,2,1,1,2,1,1,1,2,1,1,1,2,2,1,2,2,1,1,1,0,0,0,2,1,1,1,1,2,1,1,2,2,2,1,2,2,2,1,1,2,1,0,0,0,1,2,1,2,1]
 * }
 * 
 */
function tweetToMorse() {
	console.log("Query the server");
	request({
		  uri: server_url+"/api/"+HASHTAG,
		  method: "GET",
		  json: {'':''},
		}, function(error, response, body) {
		  console.log("STATUS Code: "+response.statusCode);
		  
		  if(!error && response.statusCode == 200)
		  {
			  // Response from the server
			  console.log("RESPONSE Tweet: "+body.tweet);
			  console.log("MORSE: "); 
			  var actions = body.digits;
			  i = 0;
			  // Process the array of actions
			  function actions_loop() {
			    // For each action, control the LED
			    morse(actions[i]);
			    setTimeout(function() { i++; if (i<actions.length) { actions_loop(); } }, SPEED*7);
			  };
			  actions_loop();
		  }
		  else 
		  {
			  // General error
			  console.log("Error while trying to reach the server: "+response.statusCode+" "+error);
		  }	  
	});
}
	

// BBBBBBBBBBBBBBBB
// B  MAIN calls  B
// BBBBBBBBBBBBBBBB


console.log("Run Morse");
tweetToMorse();

// then run automatically
setInterval(function(){
	console.log("Run Morse");
	tweetToMorse();
},FREQUENCY);


});

