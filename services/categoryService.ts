const baseURL = process.env.NEXT_PUBLIC_API_URL

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${baseURL}/category/all`);
        const data = await response.json();
        return data?.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

