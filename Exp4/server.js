const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/todosdb";
const PORT = 5000;

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error:", err));

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

app.listen(PORT, "localhost", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});