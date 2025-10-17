const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

let todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Do assignment", completed: false },
];

const todoSchema = Joi.object({
  title: Joi.string().min(3).required(),
  completed: Joi.boolean().required()
});

app.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/api/todos', (req, res) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));