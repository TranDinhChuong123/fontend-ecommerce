import publicAxios from './publicAxios'; // Đổi tên file nếu cần
import User from '../types/User';



export const fetchUserExistsByEmailAPI = async (email: string) => {
    const resData = await publicAxios.post('/auth/userExists', { email });
    return resData.data;
}

export const fetchRegisterUserAPI = async (user: User) => {
    const registerData = {
        name: user.name,
        username: user.email,
        password: user.password || user.email,
        email: user.email,
        role: user.role || "USER"
    }

    const resData = await publicAxios.post('/auth/register', user);
    return resData.data;
}

export const fetchloginUserAPI = async (username: string, password: string) => {
    const loginData = {
        username: username,
        password: password,
    }
    const resData = await publicAxios.post('/auth/login', loginData);
    return resData.data;
}

export const fetchRefreshTokenAPI = async (refreshToken: string) => {
    const resData = await publicAxios.post('/auth/refresh-token', {}, {
        headers: {
            'Authorization': `Bearer ${refreshToken}`,
        }
    });
    return resData.data;
}



