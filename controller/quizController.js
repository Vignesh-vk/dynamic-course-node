const Course = require('../model/course');

const addQuiz = async (req, res) => {
    const { courseId } = req.params;
    const { title, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'Title and questions are required.' });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        const newQuiz = { title, questions };
        course.quizzes.push(newQuiz);
        await course.save();

        res.status(201).json(newQuiz);
    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteQuiz = async(req,res) =>{
        const { courseId, quizId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.quizzes = course.quizzes.filter(quiz => quiz._id.toString() !== quizId);
        await course.save();
        res.status(200).json({ message: 'quiz deleted successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz', error: error.message });
    }
}


module.exports = {
    addQuiz, deleteQuiz
  };
  