module.exports = {
  getQuestions: async (req, res) => {
    const db = req.app.get("db");

    const questionsArr = await db.get_questions();

    return res.status(200).send(questionsArr);
  },

  findGame: async (req, res) => {
    const db = req.app.get("db");
    const {code} = req.params;

    const game = await db.find_game(code);

    if (game[0] && game[0].joinable) {
      return res.status(200).send(game[0]);
    }
    return res.status(200).send("game not found ");
  },

  createGame: async (req, res) => {
    const db = req.app.get("db");
    const {code} = req.params;

    const game = await db.create_game(code);

    return res.status(200).send(game[0]);
  },

  updateGame: (req, res) => {
    const db = req.app.get("db");
    const {code} = req.params;

    db.update_game(code);

    return res.status(200).send("game has been updated");
  },

  deleteGame: (req, res) => {
    const db = req.app.get("db");
    const {code} = req.params;
    db.delete_game(code);

    return res.status(200).send("game has been deleted");
  },

  addUser: (req, res) => {
    const {name, host, code, numberOfRounds} = req.body;
    const {session} = req;

    session.user = {
      name,
      host,
      code,
      numberOfRounds
    };

    res.status(200).send(session.user);
  },

  getUser: (req, res) => {
    const {session} = req;

    res.status(200).send(session);
  },

  deleteUser: (req, res) => {
    req.session.destroy();
    res.status(200).send("session destroyed");
  }
};
