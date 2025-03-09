"use client";

import withAuth from "@/HOCs/withAuth"
import { usePathname } from "next/navigation";



const WithAuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const noAuthRoutes = ["/login", "/signup"];
    if (noAuthRoutes.includes(pathname)) {
        return <>{children}</>
    }
    const WrappedComponent = withAuth(({ children }: { children: React.ReactNode }) => <>{children}</>);

    return <WrappedComponent>{children}</WrappedComponent>
}


export default WithAuthWrapper;