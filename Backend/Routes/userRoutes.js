import express from 'express'
import { RegisterUser, userLogin } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/signup',RegisterUser)
userRoutes.post('/login',userLogin)


export default userRoutes