const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const todos = await Todo.find()
            .limit(parseInt(limit))
            .skip((page - 1) * parseInt(limit));
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;