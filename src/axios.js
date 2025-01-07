import axios from "axios";
import router from "@/router";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);


export const Axios = axios;
