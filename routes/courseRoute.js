const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")
const {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    publishCourse,
    listCourse
} = require('../controller/courseController');

const router = express.Router();

router.post('/courses', authMiddleware(['instructor']), createCourse); //create new course
router.get('/list-courses', authMiddleware(['instructor', 'student']), listCourse); //list all courses
router.get('/:id', authMiddleware(['instructor', 'student']), getCourses); //show particular course
router.put('/:id', authMiddleware(['instructor']), updateCourse); //update course details
router.delete('/:id', authMiddleware(['instructor']), deleteCourse); //delete course
router.put('/:id/publish', authMiddleware(['instructor']), publishCourse); //publish a course

module.exports = router;
