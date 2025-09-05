const todoRepository = require('../repositories/todoRepository');

exports.getTodos = async (req, res) => {
    try {
        const todos = await todoRepository.findAll();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await todoRepository.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Item not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
};

exports.createTodo = async (req, res) => {
    try {
        if (!req.body.title) return res.status(400).json({ message: 'Title is required' });
        const newTodo = await todoRepository.create(req.body);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updated = await todoRepository.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Item not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const deleted = await todoRepository.delete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted', item: deleted });
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID format' });
    }
};