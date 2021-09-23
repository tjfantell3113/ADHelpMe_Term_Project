const quizService = require('../services/quiz.service')

module.exports = {
    getQuizzes,
    getQuiz,
    getOldQuiz,
    getOldQuizzes,
    submitAnswers,
    submitQuiz,
    deleteQuiz,
    deleteOldQuiz
};

function getQuizzes(req, res, next) {
    quizService.getQuizzes()
        .then(quizzes => res.json(quizzes))
        .catch(err => next(err))
}

function getQuiz(req, res, next) {
    quizService.getQuiz(req.params.quizId)
        .then(quiz => res.json(quiz))
        .catch(err => next(err))
}

function getOldQuizzes(req, res, next) {
    quizService.getOldQuizzes(req.user.sub)
        .then(quizzes => res.json(quizzes))
        .catch(err => next(err))
}

function getOldQuiz(req, res, next) {
    quizService.getOldQuiz(req.params.quizId, req.user.sub)
        .then(quiz => res.json(quiz))
        .catch(err => next(err))
}

function submitAnswers(req, res, next) {
    quizService.submitAnswers(req.body, req.user.sub)
        .then(() => res.status(200).send('"Answers submited!"'))
        .catch(err => next(err))
}

function submitQuiz(req, res, next) {
    quizService.submitQuiz(req.body, req.user.sub)
        .then(() => res.status(200).send('"Submitted new quiz!"'))
        .catch(err => next(err))
}

function deleteQuiz(req, res, next) {
    quizService.deleteQuiz(req.params.quizId)
        .then(() => res.status(200).send('"Quiz deleted!"'))
        .catch(err => next(err))
}

function deleteOldQuiz(req, res, next) {
    quizService.deleteOldQuiz(req.params.quizId, req.user.sub)
        .then(() => res.status(200).send('"Quiz removed from taken quizzes!"'))
        .catch(err => next(err))
}
