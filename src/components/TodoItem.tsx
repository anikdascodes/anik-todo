import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { Todo } from '../types/todo';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="flex items-center gap-3 flex-1">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className="text-gray-500 hover:text-blue-500 focus:outline-none transition-colors"
        >
          {todo.completed ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Circle className="text-gray-400" />
          )}
        </motion.button>
        <div className="flex-1">
          <motion.p
            animate={{
              opacity: todo.completed ? 0.5 : 1,
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
            className="text-gray-700 font-medium"
          >
            {todo.text}
          </motion.p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(todo.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[todo.priority]} shadow-sm`}
        >
          {todo.priority}
        </motion.span>
      </div>
      <motion.button
        whileHover={{ scale: 1.2, color: '#EF4444' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(todo.id)}
        className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none transition-colors"
      >
        <Trash2 size={18} />
      </motion.button>
    </div>
  );
}