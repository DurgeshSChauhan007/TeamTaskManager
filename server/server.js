const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TaskFlow API Running...");
});

// ROUTES
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/projects",
  require("./routes/projectRoutes")
);

app.use(
  "/api/tasks",
  require("./routes/taskRoutes")
);

// PORT
const PORT = 5000;

// SERVER
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});