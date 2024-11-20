import { jwtDecode } from 'jwt-decode';

// Định nghĩa kiểu cho payload nếu cần (ví dụ)
interface JwtPayload {
    sub: string;
    role: string;
    iat: number; // Issued At
    exp?: number; // Expiration (optional)
}

const decodeToken = (token: string) => {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded;
};

export default decodeToken;
