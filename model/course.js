const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    fileUrl: { type: String },
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true }
    }],
});

const SectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lessons: [LessonSchema],
});

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    category: { type: String, required: true },
    sections: [SectionSchema],
    quizzes: [QuizSchema],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    preview_image: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
