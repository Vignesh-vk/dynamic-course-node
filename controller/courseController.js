const express = require('express');
const Course = require('../model/course');

const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listCourse = async (req, res) => {
  try {
    const courses = await Course.find({});

    const coursesWithTotalSections = courses.map(course => ({
      ...course.toObject(),
      totalSections: course.sections.length
    }));

    res.status(200).send(coursesWithTotalSections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getCourses = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send();

    const courseWithTotalSections = {
      ...course.toObject(),
      totalSections: course.sections.length
    };

    res.send(courseWithTotalSections);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) return res.status(404).send();
  res.send(course);
}

const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course deleted successfully',
      course: deletedCourse
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const publishCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.query;

    if (action !== 'publish' && action !== 'draft') {
      return res.status(400).json({ message: 'Invalid action. Use "publish" or "draft".' });
    }

    const updatedStatus = action === 'publish' ? 'published' : 'draft';

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { status: updatedStatus },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: `Course ${updatedStatus === 'published' ? 'published' : 'saved as draft'} successfully`,
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  publishCourse,
  listCourse
};
