import { axiosInstance, url } from './index.js'

export const createProject = async(name) => {
    try{
        const response = await axiosInstance.post(url + '/api/project/create-project', {name});
        return response.data;
    }catch(error){
        return error;
    }
}
export const fetchAllProject = async() => {
    try{
        const response = await axiosInstance.get(url + '/api/project/fetch-projects');
        return response.data;
    }catch(error){
        return error;
    }
}