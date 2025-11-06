// src/components/AddTaskForm.jsx
import React, { useState } from 'react';

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

export default AddTaskForm;