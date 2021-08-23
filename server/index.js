require('dotenv').config();

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const courses = require('./routes/courseRoute');
const employees = require('./routes/employeeRoute');
const managers = require('./routes/managerRoute');
const skills = require('./routes/skillRoute');
const preferences = require('./routes/preferenceRoute');
const search = require('./routes/searchRoute');

const app = express();
const PORT = process.env.PORT || 5000;
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cors());

const authRouter = require('./routes/auth');

app.use('/course', courses);
app.use('/employees', employees);
app.use('/managers', managers);
app.use('/skills', skills);
app.use('/preferences', preferences);
app.use('/search', search);

app.get('/', (req, res) => {
  res.send('server working');
});

app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  res.json(err.stack);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}...`);
});
