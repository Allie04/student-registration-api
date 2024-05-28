const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

let students = []; // This will act as our in-memory database

// Route to add a new student
app.post('/students', (req, res) => {
    const { id, name, age, grade } = req.body;
    const student = { id, name, age, grade };
    students.push(student);
    res.status(201).send(student);
});

// Route to edit a student's information
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, grade } = req.body;
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).send({ message: 'Student not found' });
    }

    const updatedStudent = { id, name, age, grade };
    students[studentIndex] = updatedStudent;
    res.send(updatedStudent);
});

// Route to delete a student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).send({ message: 'Student not found' });
    }

    students.splice(studentIndex, 1);
    res.send({ message: 'Student deleted successfully' });
});

// Route to get all students
app.get('/students', (req, res) => {
    res.send(students);
});

// Route to get a student by ID
app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send({ message: 'Student not found' });
    }

    res.send(student);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});