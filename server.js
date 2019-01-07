var portnumber=8080;
var express = require('express');
var app = express();
var things = require('./things.js');
var db = require('./db/con_db')();
var SocketIo = require('socket.io'); 
var socketEvents = require('./socket.js'); 
db.openCheck();



var files=['','/uploads','/img','/css','/js'];
app.set('view engine', 'pug');
app.set('views','./views');
for(i in files)
  app.use(express.static('public'+files[i]));
app.use('/', things);




var server = app.listen(portnumber);

const io = new SocketIo(server); // socket.io와 서버 연결하는 부분
socketEvents(io); // 아까 만든 이벤트 연결

console.log("server open!! port:"+portnumber);
console.log("+ Socket communication available !!");
