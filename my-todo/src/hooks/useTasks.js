// src/hooks/useTasks.js
import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Загрузка при старте
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Миграция старых задач (с completed) → в новый формат (status)
        const migrated = parsed.map(task => {
          if (task.status) return task; // уже новый формат
          return {
            ...task,
            status: task.completed ? 'done' : 'pending'
          };
        });
        setTasks(migrated);
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
      status: 'pending', // ← теперь status вместо completed
      subtasks: [],
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Новая функция: установить статус задачи
  const setTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Циклическое переключение статуса по клику (для основной задачи)
  const cycleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        let next;
        if (task.status === 'pending') next = 'in-progress';
        else if (task.status === 'in-progress') next = 'done';
        else next = 'pending';
        return { ...task, status: next };
      })
    );
  };

  // То же самое для подзадач
  const cycleSubtaskStatus = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const updatedSubtasks = task.subtasks.map((sub) => {
          if (sub.id !== subtaskId) return sub;
          let next;
          if (sub.status === 'pending') next = 'in-progress';
          else if (sub.status === 'in-progress') next = 'done';
          else next = 'pending';
          return { ...sub, status: next };
        });
        return { ...task, subtasks: updatedSubtasks };
      })
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
                { id: Date.now(), title: title.trim(), status: 'pending' },
              ],
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
    cycleTaskStatus,
    cycleSubtaskStatus,
    deleteTask,
    addSubtask,
    deleteSubtask,
  };
};

export default useTasks;