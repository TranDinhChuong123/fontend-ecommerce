import publicAxios from '@/services/axios/publicAxios'; // Đổi tên file nếu cần
import handleApiCall from './handleApiCall';

export const fetchProductsWithFiltersAPI = async () => {
    return handleApiCall(publicAxios.post('/product', { page: 1 }));
}

export const fetchProductByIdAPI = async (productId: string): Promise<any> => {
    return handleApiCall(publicAxios.get(`/product/${productId}`));
}

