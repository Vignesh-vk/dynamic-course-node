const Course = require('../model/course');

const addLesson = async (req, res) => {
    const { courseId, sectionId } = req.params;
    const { title, fileUrl } = req.body; 

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const section = course.sections.id(sectionId);
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }

        const newLesson = {
            title: title,
            fileUrl: fileUrl 
        };

        section.lessons.push(newLesson);
        await course.save();
        res.status(201).json(section.lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteLesson = async (req,res) =>{
    const { sectionId, lessonId } = req.params;

    try {
        const course = await Course.findOne({ 'sections._id': sectionId });
        if (!course) {
            return res.status(404).send('Section not found');
        }

        const section = course.sections.id(sectionId);
        if (!section) {
            return res.status(404).send('Section not found');
        }

        section.lessons.pull(lessonId);
        await course.save();

        res.status(200).send('Lesson deleted successfully');
    } catch (error) {
        console.error('Error deleting lesson:', error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    addLesson,
    deleteLesson
  };
  