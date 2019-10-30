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

app.get("/api/questions", ctrl.getQuestions);

app.get('/api/games', ctrl.findGame)

app.post('/user', ctrl.addUser)

app.get('/user', ctrl.getUser)

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
    console.log("a user has disconnected");
  });
  socket.on("join room", data => {
    console.log(`user joined room ${data.room}`);
    socket.join(data.room);
  });

  socket.on("emit to room socket", data => {
    socket.emit("room response", data);
  });

  socket.on("blast to room socket", data => {
    io.to(data.room).emit("room response", data);
  });
});
