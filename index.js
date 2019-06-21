var express = require('express');
var app = express();
var path = require("path");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res,next){
     res.sendFile(__dirname + "//public/Component/html/login.html");
});

app.get('/chatHome',function(req,res){
    res.sendFile(__dirname + "/public/Component/html/chat.html");
}); 

io.on("connection", function(socket) {
    console.log("a user connection.");
    // console.log(socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message',function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message',msg);
    });

});

http.listen(3000,function(){
    console.log("listening on *:3000");
}); 