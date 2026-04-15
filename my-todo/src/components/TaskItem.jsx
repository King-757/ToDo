// src/components/TaskItem.jsx
import React, { useState } from 'react';
import SubtaskItem from './SubtaskItem';
import AddSubtaskForm from './AddSubtaskForm';

const TaskItem = ({
  task,
  onCycleStatus,
  onDelete,
  onAddSubtask,
  onCycleSubtaskStatus,
  onDeleteSubtask,
}) => {
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);

  // Определяем CSS-класс по статусу
  const getStatusClass = (status) => {
    if (status === 'done') return 'completed';
    if (status === 'in-progress') return 'in-progress';
    return '';
  };

  return (
    <div className={`task ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <label className="task-label">
          {/* Чекбокс визуально отмечен, если done */}
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={() => onCycleStatus(task.id)}
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
            onCycleStatus={() => onCycleSubtaskStatus(task.id, sub.id)}
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