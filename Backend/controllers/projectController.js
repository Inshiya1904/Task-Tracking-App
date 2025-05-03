import projectModel from "../Models/projectModel.js"


const createProject = async(req,res) => {
    try {
        const { name } = req.body;
        if(!name)
        {
            return res.status(400).send({
                message: 'Project name is required',
                success: false
            })
        }
        const newProject = new projectModel({
            name,
            user:req.userId
        })
        const savedProject = await newProject.save()
        await savedProject.populate('user')

        res.status(201).send({
            message: 'Project Created Successfully',
            success: true,
            data: savedProject
        })
    } catch (error) {
            res.status(400).send({
                message: error.message,
                success: false
            })
    }
   

}

const getAllProjects = async(req,res) => {
    try {
        const projects = await projectModel.find({ user:req.userId }).populate('user');
         res.status(201).send({
            message: "Project fetched successfully",
            success: true,
            data: projects
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
}
export { createProject, getAllProjects }