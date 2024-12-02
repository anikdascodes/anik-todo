import React, { useEffect, useState } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { loadTodos, saveTodos } from './utils/storage';
import { CheckSquare, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  const handleAddTodo = (text: string, priority: 'low' | 'medium' | 'high') => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckSquare className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
              <p className="text-gray-500 mt-1">Stay organized and productive</p>
            </div>
          </motion.div>
          
          <TodoInput onAdd={handleAddTodo} />
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-700">
                  Your Tasks ({todos.length})
                </h2>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                Completed: {completedTodos}
              </motion.div>
            </div>
            
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg"
              >
                <p className="text-gray-500 mb-2">No todos yet.</p>
                <p className="text-sm text-gray-400">Add your first task above!</p>
              </motion.div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;