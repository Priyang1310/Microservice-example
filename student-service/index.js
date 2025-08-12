const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); // to call Course Service

mongoose.connect('mongodb+srv://priyang1310:Priyang1310@cluster0.qtqbc.mongodb.net/studentdb')
    .then(() => console.log('Student DB Connected'));

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});
const Student = mongoose.model('Student', StudentSchema);

const app = express();
app.use(express.json());

// Create student with course validation
app.post('/', async (req, res) => {
    try {
        const courseTitle = req.body.course;
        // Call Course Service
        const courseCheck = await axios.get(`http://course-service:5002/${courseTitle}`);

        
        if (!courseCheck.data) {
            return res.status(400).json({ error: 'Course does not exist' });
        }

        const student = new Student(req.body);
        await student.save();
        res.json(student);

    } catch (err) {
        return res.status(400).json({ error: 'Invalid course or service unavailable' });
    }
});

// Get all students
app.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.listen(5001, '0.0.0.0',() => {
    console.log('Student Service running on port 5001');
});
