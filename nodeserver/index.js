// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
     origin: ['http://localhost:5500'],
     },
   });
  
  io.on('connection', socket =>{
    console.log(socket.id);
   });

const users = {};

io.on('connection', Socket =>{
    Socket.on('new-user-joined', name1 =>{
        console.log("New user", name1);
        users[Socket.id] = name1;
        Socket.broadcast.emit('user-joined',name1);
    });

    Socket.on('send', message =>{
        Socket.broadcast.emit('receive',{message: message, name1: users[Socket.id]})
    });

    Socket.on('disconnect', message =>{
        Socket.broadcast.emit('left', users[Socket.id]);
        delete users[Socket.id];
    });
});