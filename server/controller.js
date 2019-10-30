module.exports = {
  getQuestions: async (req, res) => {
    const db = req.app.get("db");
    const questionsArr = await db.get_questions();
    res.status(200).send(questionsArr);
  },

  findGame: async (req, res) => {
    const db = req.app.get("db");
    const {code} = req.params;

    game = await db.find_game(code);

    if (game[0].joinable) {
      return res.status(200).send(game[0]);
    } else {
      return res.sendStatus(404);
    }
  },

  addUser: (req, res) => {
    const {name, host, code} = req.body;
    const {session} = req;

    session.user = {
      name,
      host,
      code
    };

    res.status(200).send(session.user);
  },

  getUser: (req, res) => {
    const {session} = req;

    res.status(200).send(session);
  }
};
