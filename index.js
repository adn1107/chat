var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 5000;

app.use(express.static('public'));
app.set('views', './src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index');
    // res.sendFile('./public/views/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

// app.listen(port, err => {
//     console.log(`running server on port ${port}`);
// });

http.listen(3000, function(){
    console.log('listening on *:3000');
});
