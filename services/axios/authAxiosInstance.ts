import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const authAxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});


export default authAxiosInstance;

