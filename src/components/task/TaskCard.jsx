import React from 'react';

const TaskCard = ({ task, onSubmit }) => {
  return (
    <div className='task-card'>
      <h3 className='task-title'>{task.title}</h3>
      <p className='task-description'>{task.description}</p>
      <p className='task-due-date'>Due Date: {task.dueDate}</p>
      {/* Add other details as needed */}
      <button className='task-button' onClick={() => onSubmit(task._id)}>
        Submit
      </button>
    </div>
  );
};

export default TaskCard