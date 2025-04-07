import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));
// In-memory storage for todos
let todos = [
    {
        id: 1,
        text: 'Initial todo',
        completed: false,
        createdAt: new Date(),
    },
];
// API Routes
app.get('/api/todos', (_req, res) => {
    res.json(todos);
});
app.post('/api/todos', (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false,
        createdAt: new Date(),
    };
    todos.push(todo);
    res.status(201).json(todo);
});
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
});
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.status(204).send();
});
// Handle React Router routes
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map