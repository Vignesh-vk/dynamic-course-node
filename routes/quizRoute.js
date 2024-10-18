const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")
const {
    addQuiz,
    deleteQuiz
} = require('../controller/quizController');

const router = express.Router();

router.post('/create/:courseId', authMiddleware(['instructor']), addQuiz);  //create a quiz
router.delete('/delete/:courseId/:quizId', authMiddleware(['instructor']), deleteQuiz);  //delete a quiz

module.exports = router;
