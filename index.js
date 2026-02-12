const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

// THIS IS THE IMPORTANT LINE FOR TODAY
app.use(express.json());
let tasks=[];

app.get("/health", (req, res) => {
  res.json({ status: "TaskForge backend running 🚀" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.post("/test" , (req , res)=>{
    console.log(req.body);
    res.json({message :"received"});
})

app.post("/tasks" , (req , res)=>{
    const title=req.body.title;
//req is used for getting the output from the client
    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newtask={
        id : tasks.length+1,
        title : title,
        completed : false
    };

    tasks.push(newtask);
    res.status(201).json(newtask);
})

app.get("/tasks", (req , res)=>{
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  // Update only if provided
  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }
  
  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // find index of task
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  // 🔥 ACTUAL DELETION HAPPENS HERE
  const deletedTask = tasks.splice(index, 1)[0];

  res.json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});
