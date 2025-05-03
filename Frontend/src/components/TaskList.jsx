import React, { useState } from 'react';
import { deleteTask, updateTask } from '../apiCalls/task';
import toast from 'react-hot-toast';


const TaskList = ({tasks,setTasks}) => {

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
   console.log(editingTaskId)
  const handleDeleteTask = async(taskId) => {
    const response = await deleteTask(taskId)
    if(response.success)
    {
      toast(response.message)
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    }

  }

  const handleEditClick = (task) => {
    console.log(task)
    if (!task) {
      console.error('handleEditClick: task is undefined');
      return;
    }
    setEditingTaskId(task._id);
    setForm({
       title: task.title, 
       description: task.description, 
       status: task.status 
      });
  };

  const handleUpdate = async () => {
    const res = await updateTask(editingTaskId, form);
    setTasks(prev => prev.map(task => task._id === editingTaskId ? res.data : task));
    setEditingTaskId(null);
    setForm({ title: '', description: '', status: 'Pending' });
  };
  return (
    <div className='list'>
    <h3>Tasks List</h3>
    <div className="task-list">
    
    {tasks?.map((task) => (
      <div key={task._id} className="task-card">
      {editingTaskId === task._id ? (
       <>
       <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
            </>
          ) : (
        <>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        {task.completedAt ? <p>Completed At: {new Date(task.completedAt).toLocaleString()}</p> : ""}
        <small>Created At: {new Date(task.createdAt).toLocaleDateString()}</small>
        {/* <small>Completed At: {new Date(task.completedAt).toLocaleDateString()}</small> */}
        <div className='task-list-btn'>
          <button onClick={()=>handleDeleteTask(task._id)}>delete</button>
          <button onClick={() => handleEditClick(task)}>Edit</button>
        </div>
        </>
      )}
      </div>
    ))}
  </div>
  </div>
  )
}

export default TaskList