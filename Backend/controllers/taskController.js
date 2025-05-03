import taskModel from "../Models/taskModel.js";


const createTask = async(req,res) => {
    try {
        const { title, description, status, projectId } = req.body;
        if (!title || !projectId) {
          return res.status(400).send({ 
                message: 'Title and projectId are required',
                success: false
             });
        }
    
        const newTask = new taskModel({
          title,
          description,
          status,
          user: req.userId,
          project: projectId,
          completedAt: status === 'Completed' ? new Date() : null
        });
    
        const savedTask = await newTask.save();
        const populatedTask = await savedTask.populate([
            { path: 'user', select: 'name email country' },
            { path: 'project', select: 'name' }
          ]);
        res.status(201).send
            ({ 
                message: "Task Created Successfully",
                success: true, 
                data: populatedTask 
            });
      } catch (error) {
        res.status(400).send({ success: false, message: 'Task creation failed', error: error.message });
      }
}

const getTasksByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const tasks = await taskModel.find({ project: projectId})
      

      res.status(200).send({ 
        message: "Task fetched successfully",
        success: true, 
        data: tasks 
    });
    } catch (error) {
      res.status(400).send({ 
        success: false, 
        message: 'Fetching tasks failed', 
        error: error.message 
    });
    }
  };

  const getTasks = async (req, res) => {
    try {
    //   const { projectId } = req.params;
  
      const tasks = await taskModel.find({});
      res.status(200).send({ 
        message: "Task fetched successfully",
        success: true, 
        data: tasks 
    });
    } catch (error) {
      res.status(400).send({ 
        success: false, 
        message: 'Fetching tasks failed', 
        error: error.message 
    });
    }
  };
  
const getTaskById = async (req,res) => {
    try {
         const { taskId }  = req.params;
       const FindTask = await taskModel.findById({_id:taskId})
           if(FindTask)
           {
               return res.status(200).send({
                message: "Single Task Fetched",
                success:true,
                data:FindTask})
           }
           else
           {
               return res.status(404).send({
                success:false,
                message:"No Task found"
            })

           }
   } catch (error) {
       console.log(error)
       return res.status(400).send({
        success:false,
        message:"Internal server error"})
   }
}

const getTaskByIdAndUpdate = async (req, res) => {
    try {
      const { title, description, status, projectId } = req.body;
      const { taskId } = req.params;
  
      const findTask = await taskModel.findById(taskId);
  
      if (!findTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found",
        });
      }
  
      const updateTask = await taskModel.findByIdAndUpdate(
        taskId,
        {
          title,
          description,
          status,
          project: projectId,
          completedAt: status === "Completed" ? new Date() : null,
        },
        { new: true }
      ).populate("user", "name email").populate("project", "name");
  
      return res.status(200).send({
        message: "Task updated successfully",
        success: true,
        data: updateTask,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const findTask = await taskModel.findById(taskId);
  
      if (!findTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found"
          
        });
      }
      const deleted = await taskModel.findOneAndDelete({ _id: taskId, user: req.userId });
      res.status(200).send({ 
        success: true, 
        message: 'Task deleted successfully',
        data:deleted
    });
    } catch (error) {
      res.status(400).send({ 
        success: false, 
        message: 'Task deletion failed', 
        error: error.message });
    }
  };
  
export { createTask, getTasksByProject,getTasks,getTaskById,getTaskByIdAndUpdate,deleteTask}