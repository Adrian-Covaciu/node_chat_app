const express = require('express');
const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

// app.listen(3000, () => { console.log('App listening at 3000') });
app.use(express.static('public'));

const admin = 'Chat Bot'
// socket.emit('Some message') sends a message only to the client that connected
// socket.broadcast.emit('Some message') sends a message to everyone except the client that connected
// io.emit('Some message') sends a message to everyone
// socket.on('message' (function)) when a client sends a message
io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
        //User connecting
    socket.emit('chat message', formatMessage(admin, 'Welcome to Chat Room!'));
        //Broadcast when a user connects
    socket.broadcast.to(user.room).emit('chat message', formatMessage(admin, `${user.username} has joined the chat.`));
        // Users and Room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
        })
    });
    
    //Server receives message from user
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        //Server sends that message to all users
        io.to(user.room).emit('chat message', formatMessage(user.username, msg));
    });
    //User disconnecting
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            //Server sends message to chat that a user left
            io.to(user.room).emit('chat message', formatMessage(admin, `${user.username} has left the chat` ));   
        }
        
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
        });
      });
});