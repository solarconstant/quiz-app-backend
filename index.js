const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(morgan("dev"));
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})
.then(() => console.log('DB connected successfully.'))   
.catch(err => console.log('DB connection failed: ', err));

io.on('connect', (socket) => {
socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    let today = new Date();
    let msg_send_time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    socket.emit('message', { user: 'Quizmaster', text: `Hey ${user.name}!, welcome to ${user.room}.`, time: msg_send_time});
    socket.broadcast.to(user.room).emit('message', { user: 'Quizmaster', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
});

socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    let today = new Date();
    let msg_send_time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    io.to(user.room).emit('message', { user: user.name, text: message, time: msg_send_time});

    callback();
});

socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
    io.to(user.room).emit('message', { user: 'Quizmaster', text: `${user.name} has left.` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
})
});

app.get('/', (req, res) =>
{
    res.send("Server for Quiz App.");
});

const port = process.env.PORT || 8000;

server.listen(port, () =>
{
    console.log(`Server is up and running at port ${port}`);
})