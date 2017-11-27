var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.set('views', './src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index');
    // res.sendFile('./public/views/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});



http.listen(3000, function(){
    console.log('listening on *:3000');
});
