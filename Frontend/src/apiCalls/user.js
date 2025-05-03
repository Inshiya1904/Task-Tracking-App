import { axiosInstance, url } from './index.js'

export const userSignup = async(user) => {
    try{
        const response = await axiosInstance.post(url + '/api/user/signup', user);
        return response.data;
    }catch(error){
        return error;
    }
}

export const userLogin = async(user) => {
    try{
        const response = await axiosInstance.post(url + '/api/user/login', user);
        return response.data;
    }catch(error){
        return error;
    }
}
