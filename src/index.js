require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const connectDB = require("./configs/database");

const app = express();

app.use(bodyParser.json());

// connecting to db here
connectDB(process.env.MONGO_URI);

// CORS configuration
const corsOptions = {
  origin: ['https://learnify-tap.netlify.app', 'http://localhost:3000'],
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

const userRouter = require("./routes/user.routes");
const courseRouter = require("./routes/courses.routes");

app.use("/", userRouter);
app.use("/courses", courseRouter);

// Defining a route for the root URL ("/")
app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am running",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
