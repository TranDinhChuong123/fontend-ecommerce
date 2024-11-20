import { useEffect } from "react";
import { getSession } from "next-auth/react";
import authAxiosInstance from "@/services/axios/authAxiosInstance";
import useRefreshToken from "./useRefreshToken";

const useAxiosAuth = () => {
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = authAxiosInstance.interceptors.request.use(async (config) => {
            const session = await getSession();
            if (session?.user?.accessToken) {
                config.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
            }
            return config;
        });

        const responseInterceptor = authAxiosInstance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response) {
                    if (error.response.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;
                        await refreshToken(); 
                        const session = await getSession();
                        if (session?.user?.accessToken) {
                            originalRequest.headers["Authorization"] = `Bearer ${session.user.accessToken}`;
                        }
                        return authAxiosInstance(originalRequest);
                    }
                    if (error.response.status === 400) {
                        console.error("Bad request: ", error);
                    }
                    if (error.response.status === 403) {
                        console.error("Access forbidden: ", error);
                    }
                }

                return Promise.reject(new Error(error.response.data || error || 'Something went wrong'));
            }
        );
        // Dọn dẹp interceptor khi component unmount
        return () => {
            authAxiosInstance.interceptors.request.eject(requestInterceptor);
            authAxiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [refreshToken]); // Theo dõi refreshToken

    return authAxiosInstance;
}

export default useAxiosAuth;

