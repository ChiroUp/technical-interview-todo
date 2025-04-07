import express, { Request, Response } from 'express';
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

// Define Todo interface
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

// In-memory storage for todos
let todos: Todo[] = [
  {
    id: 1,
    text: 'Fix login bug',
    completed: false,
    createdAt: '2025-03-09T17:44:36.195024',
  },
  {
    id: 2,
    text: 'Update API endpoint',
    completed: true,
    createdAt: '2025-03-16T17:44:36.195044',
  },
  {
    id: 3,
    text: 'Refactor dashboard',
    completed: false,
    createdAt: '2025-04-04T17:44:36.195050',
  },
  {
    id: 4,
    text: 'Design new logo',
    completed: false,
    createdAt: '2025-03-10T17:44:36.195055',
  },
  {
    id: 5,
    text: 'Test payment gateway',
    completed: false,
    createdAt: '2025-03-11T17:44:36.195064',
  },
  {
    id: 6,
    text: 'Set up CI/CD',
    completed: false,
    createdAt: '2025-03-20T17:44:36.195072',
  },
  {
    id: 7,
    text: 'Review pull request',
    completed: false,
    createdAt: '2025-04-07T17:44:36.195080',
  },
  {
    id: 8,
    text: 'Deploy to production',
    completed: true,
    createdAt: '2025-03-09T17:44:36.195092',
  },
  {
    id: 9,
    text: 'Optimize database',
    completed: false,
    createdAt: '2025-03-13T17:44:36.195104',
  },
  {
    id: 10,
    text: 'Schedule team meeting',
    completed: true,
    createdAt: '2025-04-02T17:44:36.195109',
  },
  {
    id: 11,
    text: 'Draft release notes',
    completed: false,
    createdAt: '2025-04-06T17:44:36.195113',
  },
  {
    id: 12,
    text: 'Analyze performance metrics',
    completed: false,
    createdAt: '2025-03-13T17:44:36.195117',
  },
  {
    id: 13,
    text: 'Prepare onboarding flow',
    completed: true,
    createdAt: '2025-03-25T17:44:36.195121',
  },
  {
    id: 14,
    text: 'Fix broken links',
    completed: false,
    createdAt: '2025-03-09T17:44:36.195125',
  },
  {
    id: 15,
    text: 'Redesign homepage',
    completed: true,
    createdAt: '2025-03-27T17:44:36.195129',
  },
  {
    id: 16,
    text: 'Audit security',
    completed: true,
    createdAt: '2025-03-21T17:44:36.195133',
  },
  {
    id: 17,
    text: 'Implement dark mode',
    completed: false,
    createdAt: '2025-03-15T17:44:36.195137',
  },
  {
    id: 18,
    text: 'Set up analytics',
    completed: true,
    createdAt: '2025-03-14T17:44:36.195141',
  },
  {
    id: 19,
    text: 'Clean up codebase',
    completed: false,
    createdAt: '2025-03-17T17:44:36.195145',
  },
  {
    id: 20,
    text: 'Write unit tests',
    completed: false,
    createdAt: '2025-03-22T17:44:36.195149',
  },
  {
    id: 21,
    text: 'Update dependencies',
    completed: true,
    createdAt: '2025-03-21T17:44:36.195152',
  },
  {
    id: 22,
    text: 'Improve accessibility',
    completed: false,
    createdAt: '2025-03-16T17:44:36.195156',
  },
  {
    id: 23,
    text: 'Fix mobile layout',
    completed: false,
    createdAt: '2025-03-21T17:44:36.195160',
  },
  {
    id: 24,
    text: 'Plan next sprint',
    completed: false,
    createdAt: '2025-03-20T17:44:36.195164',
  },
  {
    id: 25,
    text: 'Update changelog',
    completed: false,
    createdAt: '2025-04-01T17:44:36.195167',
  },
  {
    id: 26,
    text: 'Configure logging',
    completed: true,
    createdAt: '2025-04-04T17:44:36.195172',
  },
  {
    id: 27,
    text: 'Review UX feedback',
    completed: true,
    createdAt: '2025-03-09T17:44:36.195175',
  },
  {
    id: 28,
    text: 'Tune server performance',
    completed: false,
    createdAt: '2025-03-09T17:44:36.195179',
  },
  {
    id: 29,
    text: 'Check browser compatibility',
    completed: true,
    createdAt: '2025-04-03T17:44:36.195183',
  },
  {
    id: 30,
    text: 'Update README',
    completed: false,
    createdAt: '2025-03-23T17:44:36.195187',
  },
  {
    id: 31,
    text: 'Archive old projects',
    completed: false,
    createdAt: '2025-04-01T17:44:36.195191',
  },
  {
    id: 32,
    text: 'Automate backup',
    completed: false,
    createdAt: '2025-03-12T17:44:36.195195',
  },
  {
    id: 33,
    text: 'Research new tools',
    completed: true,
    createdAt: '2025-03-19T17:44:36.195198',
  },
  {
    id: 34,
    text: 'Fix email notifications',
    completed: true,
    createdAt: '2025-03-28T17:44:36.195202',
  },
  {
    id: 35,
    text: 'Add user roles',
    completed: false,
    createdAt: '2025-04-03T17:44:36.195206',
  },
  {
    id: 36,
    text: 'Restrict admin access',
    completed: true,
    createdAt: '2025-03-09T17:44:36.195212',
  },
  {
    id: 37,
    text: 'Verify data exports',
    completed: false,
    createdAt: '2025-03-16T17:44:36.195219',
  },
  {
    id: 38,
    text: 'Localize UI text',
    completed: true,
    createdAt: '2025-03-08T17:44:36.195225',
  },
  {
    id: 39,
    text: 'Add pagination',
    completed: true,
    createdAt: '2025-03-16T17:44:36.195231',
  },
  {
    id: 40,
    text: 'Test edge cases',
    completed: true,
    createdAt: '2025-03-11T17:44:36.195237',
  },
  {
    id: 41,
    text: 'Write integration tests',
    completed: true,
    createdAt: '2025-03-22T17:44:36.195241',
  },
  {
    id: 42,
    text: 'Document API usage',
    completed: false,
    createdAt: '2025-03-14T17:44:36.195245',
  },
  {
    id: 43,
    text: 'Implement search',
    completed: true,
    createdAt: '2025-03-14T17:44:36.195248',
  },
  {
    id: 44,
    text: 'Fix caching issues',
    completed: true,
    createdAt: '2025-04-07T17:44:36.195253',
  },
  {
    id: 45,
    text: 'Update footer links',
    completed: true,
    createdAt: '2025-04-03T17:44:36.195264',
  },
  {
    id: 46,
    text: 'Add 404 page',
    completed: true,
    createdAt: '2025-03-24T17:44:36.195268',
  },
  {
    id: 47,
    text: 'Fix file uploads',
    completed: false,
    createdAt: '2025-03-08T17:44:36.195274',
  },
  {
    id: 48,
    text: 'Validate user input',
    completed: false,
    createdAt: '2025-03-09T17:44:36.195281',
  },
  {
    id: 49,
    text: 'Improve loading speed',
    completed: false,
    createdAt: '2025-03-24T17:44:36.195287',
  },
  {
    id: 50,
    text: 'Write documentation',
    completed: true,
    createdAt: '2025-03-09T17:44:36.195293',
  },
];

// API Routes
app.get('/api/todos', (_req: Request, res: Response) => {
  res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
  const todo: Todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

app.delete('/api/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

// Handle React Router routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
