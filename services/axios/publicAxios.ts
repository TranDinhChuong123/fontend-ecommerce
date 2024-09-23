import axios from 'axios';


const publicAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});


publicAxios.interceptors.response.use(
    function (response) {
        // Thành công: trả về dữ liệu response đã được xử lý
        return response.data;
    },
    function (error) {
        return Promise.reject(new Error(error.response.data || error || 'Something went wrong'));
    }
);

export default publicAxios;

