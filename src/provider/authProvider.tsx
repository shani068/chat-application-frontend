'use client'

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";


interface AuthProviderProps {
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthProviderProps | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (token : string) =>{
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        router.push("/");
    };

    const logout = () =>{
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            { children }
        </AuthContext.Provider>
    )
}