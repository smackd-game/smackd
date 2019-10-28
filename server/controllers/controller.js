module.exports = {
    getQuestions: (req, res) => {
        const db = req.app.get('db')
        db.get_questions()

    }
}