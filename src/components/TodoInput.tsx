import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Clock, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

interface TodoInputProps {
  onAdd: (text: string, priority: 'low' | 'medium' | 'high') => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
    }
  };

  const priorityOptions = [
    { value: 'low', icon: Battery, color: 'text-green-500' },
    { value: 'medium', icon: Clock, color: 'text-yellow-500' },
    { value: 'high', icon: AlertCircle, color: 'text-red-500' }
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {priorityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setPriority(option.value as 'low' | 'medium' | 'high')}
                  className={`px-4 py-3 flex items-center gap-2 ${
                    priority === option.value
                      ? 'bg-gray-100 border-r border-gray-200'
                      : 'bg-white border-r border-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${option.color}`} />
                </motion.button>
              );
            })}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm flex items-center gap-2"
          >
            <PlusCircle size={20} />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}