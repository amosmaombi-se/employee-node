const express = require('express');
const cors = require('cors');
const app = express();
//middleware
const authenticateUser = require('./middleware/authentication')
// API:
const authRouter = require('./routes/auth')
const index = require('./routes/index');
const salaryRoute = require('./routes/salary.routes');
const employeeRoute = require('./routes/employee.routes');
const departmentRoute = require('./routes/employee.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', authRouter)
app.use('/api/', salaryRoute);
app.use('/api/', employeeRoute);
// app.use('/api/', departmentRoute);

module.exports = app;