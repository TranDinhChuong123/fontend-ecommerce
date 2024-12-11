import publicAxios from '@/services/axios/publicAxios'; // Đổi tên file nếu cần
import handleApiCall from './handleApiCall';
import slugify from 'slugify';

export const fetchProductsWithFiltersAPI = async (page: number = 1, limit: number = 30) => {
    return handleApiCall(publicAxios.post('/product', { page, limit }));
}


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

export const fetchProductsWithSearchAPI = async (searchValue: string, page: number = 1, token?: string) => {
    const headers: Record<string, string> = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("token :", token);

    return handleApiCall(publicAxios.post('/product', {
        page,
        productFilter: {
            name: searchValue,
            brand: searchValue,
            categorySlug: slugify(searchValue, { lower: true }),
            slug: slugify(searchValue, { lower: true })
        }
    }, token ? { headers } : {}));
}

export const fetchProductsWithCategoryAPI = async (categoryQuery: string = 'thoi-trang-nam', page: number, searchValue: any) => {
    return handleApiCall(publicAxios.post('/product/category-slug', {
        page,
        productFilter: {
            categorySlug: categoryQuery,
            name: searchValue,
            brand: searchValue,
            slug: slugify(searchValue || '', { lower: true })
        }
    }));
}








