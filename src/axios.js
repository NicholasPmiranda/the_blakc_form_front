import axios from "axios";
import router from "@/router";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Interceptor para adicionar o token dinamicamente a cada requisição
Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratar erros 401
Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); // Opcional: remove token inválido
            router.push("/login");
        }

        if (error.response && error.response.status === 402) {
            localStorage.removeItem("token"); // Opcional: remove token inválido
            router.push("/assinatura");
        }
        return Promise.reject(error);
    }
);

export { Axios };
