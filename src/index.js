require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRouter = require('./routes/user.routes');
const connectDB = require("./configs/database")

const app = express();

app.use(bodyParser.json());

// connecting to db here
connectDB(process.env.MONGO_URI)

app.use('/User', UserRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
