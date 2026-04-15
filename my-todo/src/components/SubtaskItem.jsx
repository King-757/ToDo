// src/components/SubtaskItem.jsx
import React from 'react';

const getSubtaskStatus = (sub) => {
  if (sub.status) return sub.status;
  return sub.completed ? 'done' : 'pending';
};

const SubtaskItem = ({ subtask, onCycleStatus, onDelete }) => {
  const status = getSubtaskStatus(subtask);

  const getStatusClass = (s) => {
    if (s === 'done') return 'completed';
    if (s === 'in-progress') return 'in-progress';
    return '';
  };

  return (
    <div className={`subtask ${getStatusClass(status)}`}>
      <label className="subtask-label">
        <input
          type="checkbox"
          checked={status === 'done'}
          onChange={onCycleStatus}
        />
        <span>{subtask.title}</span>
      </label>
      <button onClick={onDelete} className="delete-btn small">
        ✕
      </button>
    </div>
  );
};

export default SubtaskItem;