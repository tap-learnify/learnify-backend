const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/database");
const userRouter = require("./routes/user.routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/User", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "I am running" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));