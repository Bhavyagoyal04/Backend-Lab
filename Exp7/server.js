const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

let todos = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Submit lab", completed: true }
];

const todoValidationRules = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('completed')
    .isBoolean().withMessage('Completed must be a boolean')
];

app.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/api/todos', todoValidationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Server running on port 3000'));