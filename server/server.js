require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const socket = require("socket.io");
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const ctrl = require("./controller");

// app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

// ----- endpoints ------ //

//questions
app.get("/api/questions", ctrl.getQuestions);

//games
app.get("/api/games/:code", ctrl.findGame);

app.post("/api/games/:code", ctrl.createGame);

app.put("/api/games/:code", ctrl.updateGame);

app.delete("/api/games/:code", ctrl.deleteGame);

// session
app.post("/user", ctrl.addUser);

app.get("/user", ctrl.getUser);

// ---------------------- //

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("connected to the database");
});

const server = app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});

// -------- sockets ------- //

const io = socket(server);

io.on("connection", socket => {
  console.log("a user has connected");

  socket.on("disconnect", () => {
    console.log("a user has disconnected", socket.id);    
  });
  socket.on("join room", data => {
    console.log(`${data.name} has joined room ${data.room}`);
    socket.join(data.room);
    io.in(data.room).emit("game data", {
      name: data.name,
      room: data.room,
      answers: data.answers
    });
    
  });

  socket.on('start', data => {
    console.log(data.room)
    socket.to(data.room).emit('start', 'get ready to start')
  })

  socket.on('leave game', data => {
    socket.leave(data.room)
    console.log(`${data.name} has left the room`)
    io.in(data.room).emit("leave", {
      name: data.name,
      room: data.room
    });
  })

  socket.on("emit to room socket", data => {
    socket.emit("room response", data);
  });

  socket.on("blast to room socket", data => {
    io.to(data.room).emit("room response", data);
  })
  
  socket.on('update list', data => {
    io.to(data.room).emit('update list', data)
  })
  socket.on('update answers', data => {
    io.to(data.room).emit('update answers', data)
    console.log('emitting updated answers')
  })
});
