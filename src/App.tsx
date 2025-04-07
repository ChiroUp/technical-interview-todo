import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CompletedTodos from './components/CompletedTodos';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/completed" element={<CompletedTodos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
