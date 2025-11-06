// src/components/AddSubtaskForm.jsx
import React, { useState } from 'react';

const AddSubtaskForm = ({ onAdd, onCancel }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subtask-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Подзадача..."
        autoFocus
        className="subtask-input"
      />
      <button type="submit" className="subtask-add-btn">
        +
      </button>
      <button type="button" onClick={onCancel} className="subtask-cancel-btn">
        Отмена
      </button>
    </form>
  );
};

export default AddSubtaskForm;