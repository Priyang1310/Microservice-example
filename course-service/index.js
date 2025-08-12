const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://priyang1310:Priyang1310@cluster0.qtqbc.mongodb.net/coursedb')
    .then(() => console.log('Course DB Connected'));

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String
});
const Course = mongoose.model('Course', CourseSchema);

const app = express();
app.use(express.json());

// Create course
app.post('/', async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json(course);
});

// Get all courses
app.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Get course by title
app.get('/:title', async (req, res) => {
    const course = await Course.findOne({ title: req.params.title });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
});

app.listen(5002,'0.0.0.0', () => {
    console.log('Course Service running on port 5002');
});
