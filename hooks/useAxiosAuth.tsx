
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import authAxiosInstance from "@/services/authAxiosInstance";
import useRefreshToken from "./useRefreshToken";
const useAxiosAuth = () => {
    const { data: session } = useSession();
    console.log("useAxiosAuth", session?.user);

    const refreshToken = useRefreshToken();

    useEffect(() => {
        // Thêm interceptor vào axios
        const requestInterceptor = authAxiosInstance.interceptors.request.use((config) => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`
            }
            return config

        });

        const responseInterceptor = authAxiosInstance.interceptors.response.use(
            response => response.data,
            async error => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    await refreshToken()
                    originalRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`
                    return authAxiosInstance(originalRequest);

                }

                return Promise.reject(error);
            }

        )

        return () => {
            authAxiosInstance.interceptors.request.eject(requestInterceptor)
            authAxiosInstance.interceptors.response.eject(responseInterceptor)
        }
    }, [session]);
    return authAxiosInstance

}

export default useAxiosAuth
