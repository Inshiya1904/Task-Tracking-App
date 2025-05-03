import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['Pending','In Progress','Completed' ],
        default: 'Pending'
    },
   createdAt:{ 
    type: Date, 
    default: Date.now 
   },
   completedAt: Date,
   user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
   project: { type: mongoose.Schema.Types.ObjectId, ref: "project"}
})

const taskModel = mongoose.model("task",taskSchema)

export default taskModel