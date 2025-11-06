// src/components/TaskItem.jsx
import React, { useState } from 'react';
import SubtaskItem from './SubtaskItem';
import AddSubtaskForm from './AddSubtaskForm';

const TaskItem = ({ task, onToggle, onDelete, onAddSubtask, onToggleSubtask, onDeleteSubtask }) => {
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);

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

        {showSubtaskForm ? (
          <AddSubtaskForm
            onAdd={(title) => {
              onAddSubtask(task.id, title);
              setShowSubtaskForm(false);
            }}
            onCancel={() => setShowSubtaskForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowSubtaskForm(true)}
            className="add-subtask-btn"
          >
            + Подзадача
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;