const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js");

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/todosdb";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Todo API!",
    endpoints: {
      "POST /auth/register": "Register a new user",
      "POST /auth/login": "Login user",
      "GET /todos": "Get all todos (requires auth)",
      "POST /todos": "Create new todo (requires auth)",
      "DELETE /todos/:id": "Delete todo (requires admin auth)"
    }
  });
});

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));