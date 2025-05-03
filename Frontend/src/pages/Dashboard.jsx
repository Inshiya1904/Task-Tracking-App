
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { fetchAllProject } from '../apiCalls/project';
import { getTask } from '../apiCalls/task';

import toast from 'react-hot-toast';
import ProjectForm from '../components/ProjectForm';
import { axiosInstance,url } from '../apiCalls';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';


const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  
  console.log("Projects",projects)
  console.log("Task",tasks)
  console.log("selectedProject",selectedProject)
  const getAllProject = async() => {
    try {
      const response = await fetchAllProject()
      if(response.success)
      {
        console.log(response)
        console.log(response.data)
        setProjects(response.data)
        setSelectedProject(response.data._id)
       
      }
     
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  const fetchTasks = async (projectId) => {
    try {
      console.log('projectId:', projectId);

      const response = await axiosInstance.get(`https://task-tracking-app-8ise.onrender.com/api/task/get-task/${projectId}`);
      if(response.data.success)
      {
        console.log(response)
        console.log(response.data)
        setTasks(response.data.data)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  useEffect(() => {
    getAllProject()
  },[])

  return (
    <>
      <Navbar/>
      <div className='dashboard'>
      <h2>Dashboard</h2>
        <ProjectForm getAllProject={getAllProject}/>
      <div className='project-list'>
      <h3>Projects List</h3>
      <select  onChange={(e) => {
        fetchTasks(e.target.value);
        setSelectedProject(e.target.value);

      }}>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>{proj.name}</option>
        ))}
      </select>
      </div>
      
      <TaskForm fetchTasks={fetchTasks} projectId={selectedProject} />
      <TaskList tasks={tasks} setTasks={setTasks}/>
      </div>
    </>
  )
}

export default Dashboard
