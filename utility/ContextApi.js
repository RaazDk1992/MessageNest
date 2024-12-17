import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Api from "./Api";

const ContextApi= createContext();

export const ContextProvider=({children})=>{

    const getToken = async()=>{

        const token = await SecureStore.getItemAsync("_token");
        return token?JSON.parse(token):null;
    };

    const getAdmin = async()=>{
        const  admin = await SecureStore.getItemAsync("IS_ADMIN");
        return admin?JSON.parse(admin):null;
    }

    const[token,setToken] = useState(getToken);
    const[currentUser,setCurrentUser] = useState(null);
    const[isAdmin,setAdmin] =useState(getAdmin);

    const fetchUser =async ()=>{
        
        const user =   JSON.parse(SecureStore.getItem("current_user"));
      
        if(user?.username){
            try {
                
                const{data} = await Api.get("/api/user/getuser")
                //console.log(data);
                

            } catch (error) {
                console.error("Error fetching user:", error.response?.data || error.message);
            }
        }

    };

    useEffect(()=>{
        if(token){
            fetchUser();
        }
    },[token]);

    return(
        <ContextApi.Provider value={{token,setToken,
            currentUser, setCurrentUser,
            isAdmin,setAdmin,token,setToken}}>

            {children}
        </ContextApi.Provider>
    );

};


export const useTimeCapsuleContext = ()=>{
    const context = useContext(ContextApi);
    return context;
}