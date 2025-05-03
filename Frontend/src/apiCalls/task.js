import { axiosInstance, url } from './index.js'

export const createTask = async(task) => {
    try{
        const response = await axiosInstance.post(url + '/api/task/create-task', task);
        return response.data;
    }catch(error){
        return error;
    }
}

export const getTask = async(projectId) => {
    try{
        const response = await axiosInstance.get(url + `/api/task/get-task/${projectId}`);
        return response.data;
    }catch(error){
        return error;
    }
}

export const updateTask = async(taskId,taskData) => {
    try{
        const response = await axiosInstance.put(url + `/api/task/update-task/${taskId}`,taskData);
        return response.data;
    }catch(error){
        return error;
    }
}

export const deleteTask = async(taskId,updatedData) => {
    try{
        const response = await axiosInstance.delete(url + `/api/task/delete-task/${taskId}`,updatedData);
        return response.data;
    }catch(error){
        return error;
    }
}