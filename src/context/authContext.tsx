import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/UserService";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";


interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onLogin?: (cpf: string, password: string, navigation: any) => Promise<any>
    onLogout?: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    })
    
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync("token")
            
            if(token){
                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }
        
        loadToken()
    },[])
    
    const login = async (username: string, password: string, navigation: any) => {
        try {
            const response =  await userService.login({username, password}, navigation)
            const token = response.data.data.access_token
            setAuthState({
                token: token,
                authenticated: true
            })

            await SecureStore.setItemAsync("token", token)
            
            axios.defaults.headers.common['Authorization'] = token
            
            return response
        } catch (e) {
            return {error: true, msg: (e as any).response?.data };
        }
    }

    const logout = async () => {
        setAuthState({
            token: null,
            authenticated: null
        })

        await SecureStore.deleteItemAsync("token")
        axios.defaults.headers.common['Authorization'] = null
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}