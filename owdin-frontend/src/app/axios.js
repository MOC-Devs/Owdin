import axios from "axios";
import { getAuth } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL: `${API_URL}/webApp`
})

axiosInstance.interceptors.request.use(
    async(config)=>{
        const user = getAuth().currentUser;
        if(user){
            // Fetching the token
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
    ,
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(async(response)=>{
    return Promise.resolve(response)
},(error)=>{
    return Promise.reject(error)
})

export default axiosInstance;