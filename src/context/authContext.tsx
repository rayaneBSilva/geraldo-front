import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/UserService";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";


interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null; isDriver: boolean | null, carId : number | null};
    onLogin?: (cpf: string, password: string, navigation: any) => Promise<any>
    onLogout?: () => Promise<any>
    onTokenUpdated?: (newToken: string, newCarId: number) => Promise<any>
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        isDriver: boolean | null;
        carId: number | null;
    }>({
        token: null,
        authenticated: null,
        isDriver: null,
        carId : null
    })
    
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync("token");
            var isDriverValue = await SecureStore.getItemAsync("isDriver");
            var isDriver = true;
            var carId = await SecureStore.getItemAsync("carId");

            if (isDriverValue == "false"){
                isDriver = false;
            }
            
            if(token){
                setAuthState({
                    token: token,
                    authenticated: true,
                    isDriver: isDriver,
                    carId: carId ? Number(carId) : null
                })
            }
        }
        
        loadToken()
    },[])
    
    const login = async (username: string, password: string, navigation: any) => {
        try {
            const response =  await userService.login({username, password}, navigation)
            const token = response.data.data.access_token
            const isDriver = response.data.data.isDriver
            setAuthState({
                token: token,
                authenticated: true,
                isDriver: isDriver,
                carId: null
            })

            await SecureStore.setItemAsync("token", token)
            await SecureStore.setItemAsync("isDriver",isDriver)

            return response
        } catch (e) {
            return {error: true, msg: (e as any).response?.data };
        }
    }

    const updateToken = async (newToken: string, newCarId: number) => {
        setAuthState({
            token: newToken,
            authenticated: true,
            isDriver: true,
            carId: newCarId,
        })
        await SecureStore.setItemAsync("token", newToken)
        await SecureStore.setItemAsync("isDriver","true")
        var carId = await SecureStore.setItemAsync("carId",`${newCarId}`)
    }

    const logout = async () => {
        setAuthState({
            token: null,
            authenticated: null,
            isDriver: null,
            carId: null
        })

        await SecureStore.deleteItemAsync("token")
       
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        onTokenUpdated: updateToken,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}