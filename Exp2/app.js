const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let currentId = 1;

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(item => item.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(todo);
});

app.post('/todos', (req, res) => {
    const { title, completed = false } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const newTodo = { id: currentId++, title, completed };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(item => item.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'Item not found' });
    }
    const { title, completed } = req.body;
    if (title !== undefined) {
        todo.title = title;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }
    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    const deleted = todos.splice(index, 1);
    res.json({ message: 'Item deleted', item: deleted[0] });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});