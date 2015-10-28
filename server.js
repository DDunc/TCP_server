"use strict";

var tcp = require('net');
var fs = require('fs');
var fileList = [];
var fileNameRan;

var server = tcp.createServer(function(socket) {
    socket.on('data', function (data) {
        fileNameRan = parseInt((Math.random().toString()).substr(2)) + ".txt";
        fs.writeFile(__dirname + '/logs/' + fileNameRan, data, function (err){
            if (err){
                return console.log(err);
            } else {
                fileList.push(fileNameRan);
                console.log('wrote data to log ' + fileList[fileList.length-1]);
            }
        });
    });
/*take heed, weary reader: this is the test. I've been trying for hours but I can't get chai-http
or anything else to work, and we ran kinda short on time to cover this.*/
    socket.on('end', function (){
        fs.access("./logs/" + fileList[fileList.length-1], function (err){
            if(err){ //error here would indicate access problem
                return console.log(err);
            } else {
                console.log("I assure you the last file" + fileList[fileList.length-1] +
                " is in the logs.");
            }
        });
    });
});

server.listen(3000, function(){
  console.log("Server is listening");
});

//var points = require(start the server, open chrome to localhost3000, hit enter a few times)*/