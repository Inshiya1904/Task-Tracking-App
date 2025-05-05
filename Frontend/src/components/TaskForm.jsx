import React, { useState } from 'react';
import { createTask } from '../apiCalls/task';
import toast from 'react-hot-toast';

const TaskForm = ({ fetchTasks,projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      projectId,
       
    }
    const response = await createTask(newTask)
    if(response.success)
    {
      toast.success(response.message)
      setTitle('');
      setDescription('');
      setStatus('Pending')
      fetchTasks(projectId);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Create Task</h3>
      <input className='task-input'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div className='select-input'>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option >Pending</option>
        <option >In Progress</option>
        <option >Completed</option>
      </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;