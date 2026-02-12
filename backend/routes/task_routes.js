const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getAllTasks,
  getTaskByTitle,
  updateTask,
  deleteTask,
  deleteAllTasks
} = require("../controllers/taskController");

// CREATE
router.post("/tasks", createTask);



// READ ONE
router.get("/tasks/title/:title", getTaskByTitle);

// UPDATE
router.put("/tasks/title/:title", updateTask);

// DELETE
router.delete("/tasks/title/:title", deleteTask);

router.delete("/tasks", deleteAllTasks);



router.get("/tasks" , authMiddleware , getAllTasks , (req ,res) => {
  res.json({
    message: "protected tasks data",
    user:req.user
  });
});

// // READ ALL
// router.get("/tasks", getAllTasks);  included in router.get as we have same

module.exports = router;
