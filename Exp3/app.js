const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/todosdb')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

app.use(express.json());

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Item not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
});

app.post('/todos', async (req, res) => {
    const { title, completed } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTodo = new Todo({ title, completed });
    await newTodo.save();
    res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted', item: deleted });
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});