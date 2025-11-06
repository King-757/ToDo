// src/components/SubtaskItem.jsx
import React from 'react';

const SubtaskItem = ({ subtask, onToggle, onDelete }) => {
  return (
    <div className={`subtask ${subtask.completed ? 'completed' : ''}`}>
      <label className="subtask-label">
        <input
          type="checkbox"
          checked={subtask.completed}
          onChange={onToggle}
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