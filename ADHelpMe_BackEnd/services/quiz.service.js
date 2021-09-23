const db = require('../_helpers/database');
const Quiz = db.Quiz;
const OldQuiz = db.OldQuiz;

module.exports = {
    getQuizzes,
    getQuiz,
    getOldQuiz,
    getOldQuizzes,
    submitAnswers,
    submitQuiz,
    deleteQuiz,
    deleteOldQuiz
}

async function getQuizzes() {
    const quizzes = await Quiz.find();
    return quizzes;
}

async function getQuiz(quizId) {
    const quiz = await Quiz.findOne({_id: quizId});
    return quiz;
}

async function getOldQuizzes(username) {
    const oldQuizzes = await OldQuiz.find({takenBy: username}).select('-hash');
    return oldQuizzes;
}

async function getOldQuiz(quizId, username) {
    const oldQuiz = await OldQuiz.findOne({_id: quizId, takenBy: username});
    return oldQuiz;
}

async function submitAnswers(quiz, username) {
    const oldQuiz = new OldQuiz({
       ...quiz,
       takenBy: username
    });
    await oldQuiz.save();
}

async function submitQuiz(quiz, username) {
    const newQuiz = new Quiz({
        ...quiz,
        createdBy: username
    });
    console.log("submit quiz:", newQuiz);
    await newQuiz.save();
}

async function deleteQuiz(quizId) {
    // validate
    const deletionInfo = await Quiz.deleteOne({_id: quizId});
    if (deletionInfo.deletedCount === 0) {
        throw 'Error deleting quiz.'
    }
}

async function deleteOldQuiz(quizId, userid) {
    // validate
    const deletionInfo = await OldQuiz.deleteOne({_id: quizId, takenBy: userid});
    if (deletionInfo.deletedCount === 0) {
        throw 'This quiz does not belong to you.'
    }
}
