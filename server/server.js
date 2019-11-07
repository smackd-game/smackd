require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const socket = require("socket.io");
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const ctrl = require("./controller");

app.use( express.static( `${__dirname}/../build` ) );

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

app.delete('/user', ctrl.deleteUser)

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

  // socket.on("disconnect", (reason) => {
  //   console.log(`${socket.id} has disconnected because ${reason}`);
  //   io.on("join room", data => {
  //     console.log(`${data.name} has joined room ${data.room}`);
  //     socket.join(data.room);
  //     io.in(data.room).emit("game data", {
  //       name: data.name,
  //       room: data.room,
  //       answer: data.answer,
  //       roundPoints: data.roundPoints,
  //       totalPoints: data.totalPoints
  //     });
  //   });
  // });
  

  socket.on("join room", data => {
    console.log(`${data.name} has joined room ${data.room}`);
    socket.join(data.room);
    io.in(data.room).emit("game data", {
      name: data.name,
      room: data.room,
      answer: data.answer,
      roundPoints: data.roundPoints,
      totalPoints: data.totalPoints
    });
  });

  socket.on("start", data => {
    console.log(data.room);
    io.in(data.room).emit("start", "get ready to start");
  });

  socket.on("has voted", data => {
    console.log(data);
    io.in(data.room).emit("voted", data);
  });
  socket.on('ready for next round', data => {
    console.log(`${data.name} is ready for the next round`)
    io.in(data.room).emit('ready to go', data)
  })

  socket.on("results", data => {
    console.log(data.room);
    io.in(data.room).emit("results", "results are in");
  });

  socket.on('resending voted data', data => {
    console.log(data)
    io.in(data.room).emit('getting voted data', data)
  })
  socket.on('resending ready for next round data', data => {
    console.log('resending updated ready for next round data')
    io.in(data.room).emit('get updated ready data', data)
  })

  socket.on("leave game", data => {
    socket.leave(data.room);
    console.log(`${data.name} has left the room`);
    io.in(data.room).emit("leave", {
      name: data.name,
      room: data.room
    });
  });
  socket.on('emit one of clearing player object', data => {
    io.in(data.room).emit('emit two of clearing player object', data)
  })
  socket.on('emit three of clearing player object', data => {
    io.in(data.room).emit('emit four of clearing player object', data)
  })
  socket.on('re-emit answers', data => {
    io.in(data.room).emit('re-receive answers', data)
  })

  // socket.on("emit to room socket", data => {
  //   socket.emit("room response", data);
  // });

  // socket.on("blast to room socket", data => {
  //   io.in(data.room).emit("room response", data);
  // });

  socket.on("update list", data => {
    io.in(data.room).emit("update list", data);
  });

  socket.on("update answers", data => {
    io.in(data.room).emit("receive answers", data);
    console.log("emitting updated answers");
  });

  socket.on("send answer", data => {
    io.in(data.room).emit("receive the answer", data);
    console.log("sending answers");
  });

  socket.on("send question", data => {
    io.in(data.room).emit("receive question", data);
  });
});
