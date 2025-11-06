// src/App.jsx
import React from 'react';
import './App.css';
import useTasks from './hooks/useTasks';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem';

const App = () => {
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
        <h1>Simple To-Do List</h1>
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
};

export default App;