import express from 'express';
import bodyParser from 'body-parser';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const app = express();
app.use(bodyParser.json());

let todos: Todo[] = [];
let currentId = 1;

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.post('/todos', (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo: Todo = {
    id: currentId++,
    title,
    completed,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id,
      title: title !== undefined ? title : todos[todoIndex].title,
      completed: completed !== undefined ? completed : todos[todoIndex].completed,
    };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex !== -1) {
    const deleted = todos.splice(todoIndex, 1)[0];
    res.json(deleted);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});