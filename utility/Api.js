import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import { configureReanimatedLogger } from "react-native-reanimated";

const BASE_URL="http://localhost:8080/api";

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

Api.interceptors.request.use(

    async(config) =>{
        try {
            const token = await EncryptedStorage.getItem("_token");
            if(token) {
                config.headers.Authorization=`Bearer ${token}`;

            }

            let csrfToken = await EncryptedStorage.getItem("CSRF");
            if(!CSRF){
                const response = await axios.get(`${BASE_URL}/api/getcsrf`,{withCredentials:true});
                csrfToken = response.data.token;
                EncryptedStorage.setItem("CSRF",csrfToken);

            }
        } catch (error) {
            console.log.error(error);
        }

        if(csrfToken){
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }

        return config;
    }

   
);
export default Api