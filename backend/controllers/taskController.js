// let tasks = []; // this is without mongodb 

// // CREATE
// exports.createTask = (req, res) => {
//   const { title } = req.body;

//   if (!title) {
//     return res.status(400).json({ error: "Title is required" });
//   }

//   const newTask = {
//     id: tasks.length + 1,
//     title,
//     completed: false
//   };

//   tasks.push(newTask);
//   res.status(201).json(newTask);
// };

// // READ ALL
// exports.getAllTasks = (req, res) => {
//   res.json(tasks);
// };

// // READ ONE
// exports.getTaskById = (req, res) => {
//   const id = parseInt(req.params.id);
//   const task = tasks.find(t => t.id === id);

//   if (!task) {
//     return res.status(404).json({ error: "Task not found" });
//   }

//   res.json(task);
// };

// // UPDATE
// exports.updateTask = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { title, completed } = req.body;

//   const task = tasks.find(t => t.id === id);

//   if (!task) {
//     return res.status(404).json({ error: "Task not found" });
//   }

//   if (title !== undefined) task.title = title;
//   if (completed !== undefined) task.completed = completed;

//   res.json(task);
// };

// // DELETE
// exports.deleteTask = (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = tasks.findIndex(t => t.id === id);

//   if (index === -1) {
//     return res.status(404).json({ error: "Task not found" });
//   }

//   const deletedTask = tasks.splice(index, 1)[0];

//   res.json({
//     message: "Task deleted successfully",
//     task: deletedTask
//   });
// };

// now with mongodb

const Task = require("../models/task.model");

// CREATE
exports.createTask = async (req, res) => {
  console.log(req.body);
  const task = await Task.create({
    title: req.body.title,
    completed: req.body.completed 
  });
  res.status(201).json(task);
};

// READ ALL
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// READ ONE
// exports.getTaskById = async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) {
//     return res.status(404).json({ error: "Task not found" });
//   }
//   res.json(task);
// };

exports.getTaskByTitle =async (req , res) =>{
  const task=await Task.findOne({title: req.params.title});

  if(!task){
    return res.status(404).json({error:"Task not found"});
  }

  res.json(task);
};

// UPDATE
// exports.updateTask = async (req, res) => {
//   const task = await Task.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   if (!task) {
//     return res.status(404).json({ error: "Task not found" });
//   }

//   res.json(task);
// };

exports.updateTask = async (req , res) =>{
  const task = await Task.findOneAndUpdate(
    {title:req.params.title},
    req.body,
    {new : true}
  );

  if(!task){
    return res.status(404).json({error:"task not found"});
  }

  res.json(task);
};

// DELETE
// exports.deleteTask = async (req, res) => {
//   const task = await Task.findByIdAndDelete(req.params.id);

//   if (!task) {
//     return res.status(404).json({ error: "Task not found" });
//   }

//   res.json({ message: "Task deleted" });
// };


exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ title: req.params.title });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};


// DELETE ALL TASKS
exports.deleteAllTasks = async (req, res) => {
  await Task.deleteMany({});
  res.json({ message: "All tasks deleted successfully" });
};

