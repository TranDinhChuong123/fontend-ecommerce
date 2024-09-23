import publicAxios from '@/services/axios/publicAxios'; // Đổi tên file nếu cần
import handleApiCall from './handleApiCall';

export const fetchProductsWithFiltersAPI = async () => {
    return handleApiCall(publicAxios.post('/product', {}));
}
export const fetchProductByIdAPI = async (productId: string) => {
    return handleApiCall(publicAxios.get(`/product/${productId}`)); 
}
