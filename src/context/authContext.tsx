import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/UserService";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";


interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onLogin?: (cpf: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
}
const navigation = useNavigation()

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

    const login = async (cpf: string, password: string) => {
        try {
            const response =  await userService.login({cpf, password}, navigation)

            setAuthState({
                token: response.data.token,
                authenticated: true
            })

            await SecureStore.setItemAsync("token", response.data.token)
            
            return response
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg };
        }
    }

    const logout = async () => {
        setAuthState({
            token: null,
            authenticated: null
        })

        await SecureStore.deleteItemAsync("token")
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}