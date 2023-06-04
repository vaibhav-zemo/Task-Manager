const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes.js");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/api/tasks", taskRoutes);

// View
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/frontend/build/index"));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port:", process.env.PORT);
});
