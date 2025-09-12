const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: String,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

todoSchema.virtual("summary").get(function () {
    return `${this.title} - ${this.completed ? "Done" : "Pending"}`;
});

todoSchema.pre("save", function (next) {
    console.log(`Task "${this.title}" is being saved...`);
    next();
});

module.exports = mongoose.model("Todo", todoSchema);