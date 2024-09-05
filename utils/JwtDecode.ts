import { jwtDecode } from 'jwt-decode';



export function getTokenExpiration(token: string ) {
    const decoded = jwtDecode(token);
    return decoded.exp;
}

