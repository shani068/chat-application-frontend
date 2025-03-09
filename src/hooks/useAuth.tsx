'use client'

import { AuthContext } from "@/provider/authProvider"
import { useContext } from "react"



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
}