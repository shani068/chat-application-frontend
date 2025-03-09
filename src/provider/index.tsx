'use client'

import { AuthProvider } from "./authProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";



const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <ToastContainer />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default Provider;