var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat', function(username, message) {
    console.log('message received, sent by: ' + username + ', content: ' + message);
    io.emit('chat', username, message);
  });
  //prev msgs
  socket.on('prev', function(prevmsg) {
   // console.log('message received, sent by: ' + username + ', content: ' + message);
    io.emit('prev', prevmsg);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
