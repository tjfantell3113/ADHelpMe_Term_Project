const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.get('/getquizzes', authorize([Role.admin, Role.user]), quizController.getQuizzes);
router.get('/getquiz/:quizId', authorize([Role.admin, Role.user]), quizController.getQuiz);
router.get('/getfinishedquiz/:quizId', authorize([Role.admin, Role.user]), quizController.getOldQuiz);
router.get('/getfinishedquizzes', authorize([Role.admin, Role.user]), quizController.getOldQuizzes);
router.post('/submitanswers', authorize([Role.admin, Role.user]), quizController.submitAnswers);
router.post('/submitnewquiz', authorize([Role.admin, Role.user]), quizController.submitQuiz);
router.delete('/deletequiz/:quizId', authorize([Role.admin]), quizController.deleteQuiz);
router.delete('/deleteoldquiz/:quizId', authorize([Role.admin, Role.user]), quizController.deleteOldQuiz);

module.exports = router;
