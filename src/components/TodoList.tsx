import { Check, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Todo } from '../types/Todo.type';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setTodos([
      {
        id: 1,
        text: 'Initial todo',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={() => {}} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <span className="text-gray-800">{todo.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => {}}
                className="p-2 text-green-600 hover:bg-green-100 rounded-full"
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                onClick={() => {}}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
