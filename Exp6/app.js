const express = require('express');
const app = express();

app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = app;