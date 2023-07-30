require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectDB = require("./configs/database")

const app = express();

app.use(bodyParser.json());

// connecting to db here
connectDB(process.env.MONGO_URI)

const userRouter = require('./routes/user.routes');
const coursesRouter = require('./routes/courses.routes');

app.use('/user', userRouter);
app.use('/courses', coursesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
