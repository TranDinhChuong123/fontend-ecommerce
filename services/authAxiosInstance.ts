import axios from 'axios';
import { fetchRefreshTokenAPI } from './authService';

const authAxiosInstance  = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});



export default authAxiosInstance;

