/**
 * Created by @Jun0413
 * Date: 05/09/2018
 */

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(".")); // to use static assets frappe-gantt

app.get('/', function(req, res){
  res.sendFile(__dirname + '/gantt.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');

    let task = `{"id": "Task 1", "name": "Redesign website", "start": "2016-12-28", "end": "2016-12-31","progress": 20, "dependencies": "Task 2, Task 3", "custom_class": "bar-milestone"}`;

    io.emit("init-display", task);
});

