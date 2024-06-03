const Joi = require('joi');
const express = require('express');
const employeesData = require('./employees.json');

const app = express();

app.get('/employees', (req, res) => {
    console.log('GET /employees');
    res.json(employeesData.employees); 
});

app.get('/employees/:employeeID', (req, res) => {
    const employeeID = parseInt(req.params.employeeID);
    console.log('GET /employees/' + employeeID);

    const employee = employeesData.employees.find(
        emp => emp.employeeID === employeeID
    );

    if (!employee) {
        console.log('Employee not found');
        res.status(404).json({ error: 'Employee not found' });
        return;
    }

    console.log('Employee found:', employee);
    res.json(employee);
});


// PORT
const port = process.env.PORT || 3000; 

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Listening on port ${port}...`));
