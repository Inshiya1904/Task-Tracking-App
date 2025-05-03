import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { createTask, deleteTask, getTaskById, getTaskByIdAndUpdate, getTasks, getTasksByProject } from '../controllers/taskController.js';

const taskRoutes = express.Router();

taskRoutes.post('/create-task',authMiddleware,createTask)
taskRoutes.get('/get-task/:projectId',authMiddleware,getTasksByProject)
taskRoutes.get('/get-task',authMiddleware,getTasks)
taskRoutes.get('/get-taskbyid/:taskId',authMiddleware,getTaskById)
taskRoutes.put('/update-task/:taskId',authMiddleware,getTaskByIdAndUpdate)
taskRoutes.delete('/delete-task/:taskId',authMiddleware,deleteTask)


export default taskRoutes