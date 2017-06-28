var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var http = require('http').Server(app);
var island = require("./island.js");
server = new island.Server();

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get(/^(.+)$/, function(req, res) {
  console.log("static file request: " + req.params);
  res.sendFile(__dirname + req.params[0]);
});

app.post('/login', function(req, res) {
  if (server.authenticate(req.body.username, req.body.password)) {
    res.send("success, ur logged in");
  }
  else {
    res.send("failed");
  }
  //console.log(req.body.username);
  //console.log(req.body.password);
});

app.post('/signup', function(req, res){
  if (server.createAccount(req.body.username, req.body.password)) {
    res.send("success");
  }
  else {
    res.send("failed");
  }
  //console.log(req.body.username);
  //console.log(req.body.password);
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
