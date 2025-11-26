import axios from "axios"

const API_BASE="http://localhost:5000";
export const createApiClient=(idToken)=>{
    const instance=axios.create({
        baseURL:`${API_BASE}/api`,
    });

    instance.interceptors.request.use(config=>{
        if(idToken){
            config.headers.Authorization=`Bearer ${idToken}`;
        }
        return config;
    });
    return instance;
}