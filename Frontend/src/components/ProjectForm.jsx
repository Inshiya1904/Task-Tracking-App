import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createProject } from '../apiCalls/project';

const ProjectForm = ({getAllProject}) => {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createProject(name);
    if(response.success)
      {
          setName("")
          toast.success(response.message)
          console.log(response)
          getAllProject(response.data)
      }
      else
      {
          toast.success(response.message)
      }
    
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Create Project</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;