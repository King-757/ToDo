// src/hooks/useTasks.js
import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Миграция: если у задачи нет status — создаём из completed
        const migrated = parsed.map(task => {
          if ('status' in task) return task;
          return {
            ...task,
            status: task.completed ? 'done' : 'pending'
          };
        });
        setTasks(migrated);
      } catch (e) {
        console.error('Failed to parse tasks');
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTasks(prev => [...prev, {
      id: Date.now(),
      title: title.trim(),
      status: 'pending',
      subtasks: [],
    }]);
  };

  const cycleTaskStatus = (taskId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;
        let next;
        if (task.status === 'pending') next = 'in-progress';
        else if (task.status === 'in-progress') next = 'done';
        else next = 'pending';
        return { ...task, status: next };
      })
    );
  };

  const cycleSubtaskStatus = (taskId, subtaskId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          subtasks: task.subtasks.map(sub => {
            if (sub.id !== subtaskId) return sub;
            let next;
            if (sub.status === 'pending') next = 'in-progress';
            else if (sub.status === 'in-progress') next = 'done';
            else next = 'pending';
            return { ...sub, status: next };
          })
        };
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addSubtask = (taskId, title) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [...task.subtasks, {
                id: Date.now(),
                title: title.trim(),
                status: 'pending'
              }]
            }
          : task
      )
    );
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(s => s.id !== subtaskId)
            }
          : task
      )
    );
  };

  return {
    tasks,
    addTask,
    cycleTaskStatus,
    cycleSubtaskStatus,
    deleteTask,
    addSubtask,
    deleteSubtask,
  };
};

export default useTasks;