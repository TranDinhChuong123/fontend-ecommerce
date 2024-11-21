import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-2-7wzc.onrender.com/api/v1';

const publicAxios = axios.create({
    baseURL: baseURL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});


publicAxios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(new Error(error?.response?.data || error || 'Something went wrong'));
    }
);

export default publicAxios;

