import axios from "axios";

export const url = "https://task-tracking-app-8ise.onrender.com/";

export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});
