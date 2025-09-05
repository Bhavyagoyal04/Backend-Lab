const Todo = require('../models/todoModel');

class TodoRepository {
    async findAll() {
        return await Todo.find();
    }

    async findById(id) {
        return await Todo.findById(id);
    }

    async create(data) {
        const todo = new Todo(data);
        return await todo.save();
    }

    async update(id, data) {
        return await Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id) {
        return await Todo.findByIdAndDelete(id);
    }
}

module.exports = new TodoRepository();