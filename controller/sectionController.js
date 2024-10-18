const express = require('express');
const Section = require('../model/section');
const Course = require('../model/course');

const addSection = async (req, res) => {
  try {
      const course = await Course.findById(req.params.id);
      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }

      const { title } = req.body;
      if (!title) {
          return res.status(400).json({ message: 'Title is required' });
      }

      course.sections.push({ title });
      await course.save();
      res.status(201).json(course);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }

      const sectionIndex = course.sections.findIndex(section => section._id.toString() === req.params.sectionId);
      if (sectionIndex === -1) {
          return res.status(404).json({ message: 'Section not found' });
      }

      course.sections.splice(sectionIndex, 1);
      await course.save();

      res.status(200).json({ message: 'Section deleted successfully', course });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


module.exports = {
  addSection,
  deleteSection
};
