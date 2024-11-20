import publicAxios from '@/services/axios/publicAxios'; // Đổi tên file nếu cần
import handleApiCall from './handleApiCall';
import slugify from 'slugify';

export const fetchProductsWithFiltersAPI = async (page: number = 1) => {
    
    return handleApiCall(publicAxios.post('/product', { page }));
}

// export const fetchProductByIdAPI = async (productId: string): Promise<any> => {
//     return handleApiCall(publicAxios.get(`/product/${productId}`));
// }
// Cập nhật API để nhận token từ bên ngoài
export const fetchProductByIdAPI = async (productId: string, token?: string): Promise<any> => {
    const headers: Record<string, string> = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return handleApiCall(publicAxios.get(`/product/${productId}`, token ? { headers } : {}));
};


export const fetchProductsWithDiscountAPI = async (discount: number, page: number = 1) => {
    return handleApiCall(publicAxios.post('/product', { page, productFilter: { discountPercent: discount } }));
}

export const fetchProductsWithTotalSoldAPI = async (page: number = 1) => {
    return handleApiCall(publicAxios.post('/product', {
        page,
        sort: 'total_sold',
        sortDirection: 'desc',
    }));
}

export const fetchProductsWithSearchAPI = async (searchValue: string, page: number = 1) => {
    return handleApiCall(publicAxios.post('/product', {
        page,
        productFilter: {
            name: searchValue,
            brand: searchValue,
            category: slugify(searchValue, { lower: true }),
            slug: slugify(searchValue, { lower: true })
        }
    }));
}

export const fetchProductsWithCategoryAPI = async (categoryQuery: string= 'thoi-trang-nam', page: number, searchValue: string) => {
    return handleApiCall(publicAxios.post('/product', {
        page,
        productFilter: {
            category: categoryQuery,
            name: searchValue,
            brand: searchValue,
            slug: slugify(searchValue, { lower: true })
        }
    }));
}








