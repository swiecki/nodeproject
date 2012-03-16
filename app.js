var express = require('express');
var urlpaser = require('url');

var authCheck = function (req, res, next) {
    url = req.urlp = urlpaser.parse(req.url, true);

    // ####
    // Logout
    if ( url.pathname == "/logout" ) {
      req.session.destroy();
    }

    // ####
    // Is User already validated?
    if (req.session && req.session.auth == true) {
      next(); // stop here and pass to the next onion ring of connect
      return;
    }

    // ########
    // Auth - Replace this simple if with you Database or File or Whatever...
    // If Database, you need a Async callback...
    if ( url.pathname == "/login" && 
         url.query.name == "max" && 
         url.query.pwd == "herewego"  ) {
      req.session.auth = true;
      next();
      return;
    }

    // ####
    // This user is not authorized. Stop talking to him.
    res.writeHead(403);
    res.end('Sorry you are not authorized.\n\nFor a login use: /login?name=max&pwd=herewego');
    return;
}

var helloWorldContent = function (req, res, next) {
    res.sendfile(__dirname + '/index.html');
}

var app = express.createServer();
	/*express.logger({ format: ':method :url' }),
	express.cookieParser(),
	express.session({ secret: 'foobar' }),
	express.bodyParser(),
	authCheck,
	helloWorldContent*/

var io = require('socket.io').listen(app);
app.listen(1337);

app.use(express.cookieParser());
app.use(express.session({ secret: 'requiredstring'}));
//app.set('view options', { layout: false});
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  console.log('emitting server go');
  socket.emit('servergo');
  socket.on('clientgo', function (data) {
  	console.log(data);
  });
  socket.on('button1 clicked', function (data) {
		console.log(data);
		socket.broadcast.emit('destroyhero');
  });
	socket.on('button2 clicked', function (data) {
		console.log(data);
		socket.broadcast.emit('gohero');
	  });
});