const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")
const {
    addLesson,
    deleteLesson
} = require('../controller/lessonController');

const router = express.Router();

router.post('/:courseId/:sectionId', authMiddleware(['instructor']), addLesson); //create new lesson
router.delete('/:sectionId/:lessonId', authMiddleware(['instructor']), deleteLesson) //delete lesson

module.exports = router;
