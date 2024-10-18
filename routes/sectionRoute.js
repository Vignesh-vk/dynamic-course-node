const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")
const {
    addSection,
    deleteSection
} = require('../controller/sectionController');

const router = express.Router();

router.post('/:id', authMiddleware(['instructor']), addSection); //create a section
router.delete('/:courseId/:sectionId', authMiddleware(['instructor']), deleteSection);  //delete section

module.exports = router;
