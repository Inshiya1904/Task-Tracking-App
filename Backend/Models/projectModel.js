import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }
    
},{timestamps:true})

const projectModel = mongoose.model("project",projectSchema)

export default projectModel