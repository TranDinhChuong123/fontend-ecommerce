
const handleApiCall = async (apiCall: Promise<any>): Promise<any> => {
    try {
        const { data } = await apiCall;
        return data;
    } catch (error: any) {
        console.error('API error:', error.response?.data?.message || error.message || 'Something went wrong');
        return error.response?.data?.message || error.message || 'Something went wrong';
    }
};

export default handleApiCall;
