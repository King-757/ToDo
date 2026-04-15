// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

// Хук для управления темой
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

// Хук задач (остаётся почти без изменений)
const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: title.trim(), completed: false, subtasks: [] },
    ]);
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

// Компонент кнопки темы
const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

// Компоненты формы и задач (без изменений, но скопированы для полноты)
const AddTaskForm = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Добавить задачу..."
        className="add-input"
      />
      <button type="submit" className="add-btn">
        +
      </button>
    </form>
  );
};

const SubtaskItem = ({ subtask, onToggle, onDelete }) => (
  <div className={`subtask ${subtask.completed ? 'completed' : ''}`}>
    <label className="subtask-label">
      <input type="checkbox" checked={subtask.completed} onChange={onToggle} />
      <span>{subtask.title}</span>
    </label>
    <button onClick={onDelete} className="delete-btn small">
      ✕
    </button>
  </div>
);

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddSubtask(task.id, input);
      setInput('');
      setShowForm(false);
    }
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <label className="task-label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="task-title">{task.title}</span>
        </label>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          ✕
        </button>
      </div>
      <div className="subtasks">
        {task.subtasks.map((sub) => (
          <SubtaskItem
            key={sub.id}
            subtask={sub}
            onToggle={() => onToggleSubtask(task.id, sub.id)}
            onDelete={() => onDeleteSubtask(task.id, sub.id)}
          />
        ))}
        {showForm ? (
          <form onSubmit={handleAdd} className="subtask-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Подзадача..."
              className="subtask-input"
              autoFocus
            />
            <button type="submit" className="subtask-add-btn">
              +
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="subtask-cancel-btn"
            >
              Отмена
            </button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="add-subtask-btn">
            + Подзадача
          </button>
        )}
      </div>
    </div>
  );
};

// Главный компонент
function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  } = useTasks();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Simple To-Do List</h1>
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </div>
        <AddTaskForm onAdd={addTask} />
      </header>

      <main className="tasks">
        {tasks.length === 0 ? (
          <p className="empty">Нет задач. Добавьте новую!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onAddSubtask={addSubtask}
              onToggleSubtask={toggleSubtask}
              onDeleteSubtask={deleteSubtask}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;