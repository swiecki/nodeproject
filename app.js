var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
app.listen(1337);
//app.set('view options', { layout: false});
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.get('/', function (req, res) {
  //res.render(__dirname + '/index.jade', { title: 'My Site'});
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  console.log('emitting server go');
  socket.emit('servergo');
  socket.on('clientgo', function (data) {
    	console.log(data);
  });
  socket.on('about clicked', function (data) {
	console.log(data);
	socket.broadcast.emit('aboutdestroy');
  });
});