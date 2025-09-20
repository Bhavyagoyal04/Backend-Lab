const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

let todos = [
  { id: 1, task: "Learn Node.js", done: false },
  { id: 2, task: "Build To-Do API", done: true }
];

router.get("/", verifyToken, (req, res) => {
  res.json(todos);
});

router.post("/", verifyToken, (req, res) => {
  const newTodo = { id: todos.length + 1, task: req.body.task, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});

router.delete("/:id", verifyToken, isAdmin, (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.json({ message: "Todo deleted by Admin" });
});

module.exports = router;