require('dotenv').config()
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const socket = require('socket.io')
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

app.get('/api/questions', ctrl.getQuestions)

// ---------------------- //
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("connected to the database and");
});

const server = 
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`);
  });


// --------sockets------- //

const io = socket(server)

io.on('connection', socket => {
  console.log('a user has connected')

  socket.on('disconnect', function(){
    console.log('a user has disconnected')
  })
})

