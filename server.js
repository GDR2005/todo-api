const express = require("express");
const app = express();
const PORT = 3000;

// todos

let todos = [{
    id: 1,
    task: "learn node-js",
    done: false
}];

// Get all

app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get one

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todos);
});

// Create

app.post('todos', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(404).json({ error: 'task is required' });
    const newtodo = {
        id: todos.length + 1,
        task,
        done: false
    };
    todos.push(newtodo);
    res.status(201).json(newtodo);
});

// Update

app.put('todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const { task, done } = req.body;
    if (task !== undefined) todo.task = task;
    if (done !== undefined) todo.done = done;

    res.json(todo);
});

// Delete

app.delete('todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    todos.splice(index, 1);
    res.status(201).send();
});

app.listen(PORT, () => {
    console.log(`Running On Port ${PORT}`);
});