// src/components/TaskItem.jsx
import React, { useState } from 'react';
import SubtaskItem from './SubtaskItem';
import AddSubtaskForm from './AddSubtaskForm';

// Вспомогательная функция для обратной совместимости
const getTaskStatus = (task) => {
  if (task.status) return task.status;
  return task.completed ? 'done' : 'pending';
};

const TaskItem = ({
  task,
  onCycleStatus,
  onDelete,
  onAddSubtask,
  onCycleSubtaskStatus,
  onDeleteSubtask,
}) => {
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const status = getTaskStatus(task);

  const getStatusClass = (s) => {
    if (s === 'done') return 'completed';
    if (s === 'in-progress') return 'in-progress';
    return '';
  };

  return (
    <div className={`task ${getStatusClass(status)}`}>
      <div className="task-header">
        <label className="task-label">
          <input
            type="checkbox"
            checked={status === 'done'}
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