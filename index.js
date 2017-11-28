var express = require('express');
var app = express();


var port = 5000;

app.use(express.static('public'));
app.set('views', './src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index');
    // res.sendFile('./public/views/index.html');
});

var server = app.listen(port, err => {
    console.log(`running server on port ${port}`)
})
var io = require('socket.io').listen(server);


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



// http.listen(5000, function(){
//     console.log('listening on *:5000');
// });
