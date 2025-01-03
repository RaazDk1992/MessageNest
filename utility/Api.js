import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "http://192.168.1.13:8080";

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
});

Api.interceptors.request.use(
    async (config) => {
        try {
           
            const token = await SecureStore.getItem("_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn("Authorization token not found");
            }

            let csrfToken = await SecureStore.getItem("CSRF");

            if (!csrfToken) {
                // Fetch CSRF token if not present
                const response = await axios.get(`${BASE_URL}/api/getcsrf`, { withCredentials: true });
                csrfToken = response.data.token;

                
                await SecureStore.setItem("CSRF", csrfToken);
            }
            const isFileUpload = config.data instanceof FormData;
            if(isFileUpload){
                config.headers["Content-Type"]="multipart/form-data";

            }else {
                config.headers["Content-Type"]="application/json";
            }
            if (csrfToken) {
                config.headers["X-XSRF-TOKEN"] = csrfToken;
            }
        } catch (error) {
            console.error("Request interceptor error:", error);
            throw error; // Propagate error
        }
        //console.log(config);
        return config;
    }
);

export default Api;
