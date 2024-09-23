import publicAxios from '@/services/axios/publicAxios'; // Đổi tên file nếu cần
import User from '../types/User';

export const fetchUserExistsByEmailAPI = async (email: string) => {
    const { data } = await publicAxios.post('/auth/userExists', { email });
    return data;
}

export const fetchRegisterUserAPI = async (user: User) => {
    const registerData = {
        name: user.name,
        username: user.email,
        password: user.password || user.email,
        email: user.email,
        role: user.role || "CUSTOMER",
    }

    const { data } = await publicAxios.post('/auth/register', user);
    return data;
}

export const fetchloginUserAPI = async (username: string, password: string) => {
    const loginData = {
        username: username,
        password: password,
    }
    const { data } = await publicAxios.post('/auth/login', loginData);
    return data;
}

export const fetchRefreshTokenAPI = async (refreshToken: string) => {
    const { data } = await publicAxios.post('/auth/refresh-token', {}, {
        headers: {
            'Authorization': `Bearer ${refreshToken}`,
        }
    });
    return data;
}



