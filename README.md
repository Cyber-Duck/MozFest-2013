# Mozilla Festival 2013
**Controlling the physical world from a web application**


This is the support material for the learning lab.
In this session, we will create a [NodeBot](http://www.voodootikigod.com/nodebots-the-rise-of-js-robotics), and control it from a web application. 

A NodeBot is a Javascript controlled Arduino:

- Using the Firmata library loaded on the Arduino
- Using the Node.js module [johhny-five](https://github.com/rwaldron/johnny-five) 
 
We will build a Node.js application "**Dashtag**", to display morse code with an LED.
A web application will control our NodeBot: receives query and responds with a tweet from a specific hashtag, morse encoded.


# 1) Setup

## GIT
Clone this repository on your machine

## Setup and Assemble Arduino
- Add the LED to the board using pin 13 and ground pin:

  <img src="http://mozfest.cyberduck.net/assets/images/board_off.png" width="300"> 
- Download [Arduino IDE](http://arduino.cc/en/main/software)
- Plug in your Arduino or Arduino compatible microcontroller via USB
- Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
- Click the "Upload" button.

## Install Node.js
<img src="http://nodejs.org/images/logos/nodejs-dark.png">

[Node.js download page](http://nodejs.org/download/)

## Node.js packages
- Open a terminal and go to the folder of the project
- Run the following command to install dependencies: "request" and "johnny-five":
``` bash
npm install
```
# 2) Time to play!

## Test 
To test if Node.js, johhny-five and Arduino are working together, run the test app:

``` bash
node testled.js
```
## The Morse app
[http://mozfest.cyberduck.net/](http://mozfest.cyberduck.net/)
 
- use **/*[hashtag]*** to view the webview for a particular hashtag (if blank reverts to mozfest)
- use **/api/*[hastag]*** to get the JSON (if hashtag is blank reverts to mozfest).

## Dashtag

Run the following command:

``` bash
node dashtag.js
```

# 3) Going further

- Johnny-Five [official documentation](https://github.com/rwaldron/johnny-five)
- The [Cuckoo Quack](http://www.cyber-duck.co.uk/blog/the-cuckoo-quack), [YouTube demo](http://youtu.be/m3Glp4Pkcuk)
 
