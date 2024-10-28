import publicAxios from '@/services/axios/publicAxios'; // Đổi tên file nếu cần
import handleApiCall from './handleApiCall';

export const fetchReviewsAPI = async (productId: string) => {
    return handleApiCall(publicAxios.get(`/review/productId/${productId}`));
}