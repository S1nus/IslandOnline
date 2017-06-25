var express = require('express');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require("socket.io")(http);
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get(/^(.+)$/, function(req, res) {
  console.log("static file request: " + req.params);
  res.sendFile(__dirname + req.params[0]);
});
/*
app.post('/meme', function(req, res) {
  console.log(req.body.username);
});*/

io.on('connection', function(socket) {
  console.log("A client has connected");
  messageHandler.mySockets.push(socket);
  socket.room = null;
  socket.on('disconnect', function() {
    var index = messageHandler.mySockets.indexOf(this);
    messageHandler.mySockets.splice(index, 1);
    console.log("A client has disconnected");
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
