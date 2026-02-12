require("dotenv").config();
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task_routes");
const authRoutes=require("./routes/authRoutes");
const connectDB = require("./config/db");
const app = express();


app.use(cors());
app.use(express.json());
connectDB();

// use routes
app.use(taskRoutes);
app.use(authRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
