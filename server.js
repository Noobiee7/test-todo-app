const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add new todo
app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text };
  todos.push(todo);
  res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
