import  express from "express"
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from "./config/dbConfig.js";
import userRoutes from "./Routes/userRoutes.js";
import projectRoutes from "./Routes/projctRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
const app = express();
const port = process.env.PORT || 4000;

//DB connection
connectDB();
app.use(cors()) // using this we can access backend from frontend

// middleware
app.use(express.json()); // use it convert json string into js object



// api endpoints
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);



app.get('/',(req,res) => {
    res.send("Hello Backend")
})



// server
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
