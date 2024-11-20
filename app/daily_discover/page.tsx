import DailyDiscoverClient from '../components/daily_discover/DailyDiscoverClient';
import { fetchProductsWithFiltersAPI } from '@/services/productService';

interface DailyDiscoverPageProps {
    searchParams?: { page?: number };
}

const DailyDiscoverPage = async ({ searchParams }: DailyDiscoverPageProps) => {
    const products = await fetchProductsWithFiltersAPI(searchParams?.page);

    return (
        <DailyDiscoverClient
            products={products}
            currentPage={searchParams?.page || 2}
        />
    );
};

export default DailyDiscoverPage;
