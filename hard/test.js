const Joi = require('joi');
// Load express module
const express = require('express');

// Call the express function to create an Express application
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Define a route for /api/courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({ //defines the shape of our object
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body); // Recommended

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


// Define a route for /api/courses/:id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found'); // 404 object not found
    } else {
        res.send(course);
    }
});

app.get('/api/posts/:year/:months', (req, res) => {
    res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000; // Proper way to assign a port to a Node application
// Attempt to read the value of an environment variable called PORT, if there's a value use that
// otherwise use an arbitrary number for your development machine

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Listening on port ${port}...`));