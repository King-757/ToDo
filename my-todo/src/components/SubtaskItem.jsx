// src/components/SubtaskItem.jsx
import React from 'react';

const SubtaskItem = ({ subtask, onCycleStatus, onDelete }) => {
  const getStatusClass = (status) => {
    if (status === 'done') return 'completed';
    if (status === 'in-progress') return 'in-progress';
    return '';
  };

  return (
    <div className={`subtask ${getStatusClass(subtask.status)}`}>
      <label className="subtask-label">
        <input
          type="checkbox"
          checked={subtask.status === 'done'}
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