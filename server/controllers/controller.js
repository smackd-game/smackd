module.exports = {
    getQuestions: async (req, res) => {
        const db = req.app.get('db')
        const questionsArr = await db.get_questions()
        res.status(200).send(questionsArr)
    }
}