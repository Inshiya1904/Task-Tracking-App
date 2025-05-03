import express from 'express'
import { createProject, getAllProjects } from '../controllers/projectController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const projectRoutes = express.Router();

projectRoutes.post('/create-project',authMiddleware,createProject)
projectRoutes.get('/fetch-projects',authMiddleware,getAllProjects)


export default projectRoutes