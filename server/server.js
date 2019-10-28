const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const ctrl = require("./controllers/controller");

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

// -------------------- //

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("connected to the database");
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`);
  });
});
