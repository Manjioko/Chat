var express = require('express');
var app = express();
var path = require("path");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var username = {};

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res,next){
     res.sendFile(__dirname + "/public/Component/html/login.html");
});

app.get('/chatHome',function(req,res){
    res.sendFile(__dirname + "/public/Component/html/chat.html");
}); 

io.on("connection", function(socket) {
    socket.on('logined message',function(msg) {
        console.log(msg + " is connected.");
        username[socket.id] = msg;
        // username.push(msg);
        console.log(username);
    });
    
    socket.on('disconnect', function(){
        //console.log(socket.id);
        if(username.hasOwnProperty(socket.id)) {
            console.log(username[socket.id] + ' is disconnected');
            delete username[socket.id];
            console.log(username);
        } else {
            console.log('user disconnected');
        }
        
    });
    socket.on('chat message',function(msg) {
        console.log(username[socket.id] + ': ' +msg);
        io.emit('chat message',username[socket.id] + ': ' +msg);
    });

});

http.listen(3000,function(){
    console.log("listening on *:3000");
}); 