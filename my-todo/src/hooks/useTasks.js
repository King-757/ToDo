// src/hooks/useTasks.js
import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Загрузка при старте
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse tasks from localStorage');
        setTasks([]);
      }
    }
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      subtasks: [],
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const addSubtask = (taskId, title) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Date.now(), title: title.trim(), completed: false },
              ],
            }
          : task
      )
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((sub) =>
                sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
              ),
            }
          : task
      )
    );
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId),
            }
          : task
      )
    );
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  };
};

export default useTasks;