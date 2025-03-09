'use client'

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const authenticatedComponent = (props: P) => {
        const { isAuthenticated, loading } = useAuth();
        const router = useRouter();
        
        useEffect(() =>{
            if(!isAuthenticated && !loading){
                router.replace("/login");
            }
        }, [isAuthenticated, loading, router]);

        if(loading){
            return <div>Loading...</div>
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    }

    return authenticatedComponent;
}

export default withAuth;