const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use("/User", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "I am running" });
});

app.listen(PORT, () => console.log(`Server is running on port ${port}`));