import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Todo } from '../types/Todo.type';

const CompletedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchCompletedTodos();
  }, []);

  const fetchCompletedTodos = async () => {
    return;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Todos</h2>
      <div className="space-y-4">
        {completedTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 line-through">{todo.text}</span>
              <span className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => {}}
              className="p-2 text-red-600 hover:bg-red-100 rounded-full"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        {completedTodos.length === 0 && (
          <p className="text-center text-gray-500">No completed todos yet</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTodos;
