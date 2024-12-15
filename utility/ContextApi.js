import { Children, createContext, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

const ContextApi= createContext();

export const ContextProvider=({Children})=>{

    const getToken = EncryptedStorage.getItem("_token")?
    JSON.stringify(EncryptedStorage.getItem("_token")):null;

    const isAdmin = EncryptedStorage.getItem("IS_ADMIN")?
    JSON.stringify(EncryptedStorage.getItem("IS_ADMIN")):null;

    const[token,setToken] = useState(getToken);
    const[currentUser,setCurrentUser] = useState(null);
    cont[isAdmin,setIsAdmin] =useState(isAdmin);

    const fetchUser =async ()=>{
        
        const user =  await EncryptedStorage.getItem("current_user");
        if(user?.username){
            try {
                
                
            } catch (error) {
                
            }
        }

    }

}