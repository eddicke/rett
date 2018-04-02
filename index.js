var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var oldMsg = []
io.on('connection', function(socket) {
  io.emit("oldMsg", oldMsg);
  socket.on('chat', function(username, message) {
    console.log('message received, sent by: ' + username + ', content: ' + message);
    oldMsg.push('message received, sent by: ' + username + ', content: ' + message);
    io.emit('chat', username, message);
  });
 socket.on('ademola', function(gme){
    io.emit('ademola', gme);
  });
  
  
   socket.on('msg', function(data){
    io.emit('msg', data);
  });
  
 socket.on('hunts', function(me){
    io.emit('hunts', me);
  });

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
