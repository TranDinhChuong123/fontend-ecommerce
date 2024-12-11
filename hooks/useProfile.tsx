import { useEffect, useState } from 'react';
import handleApiCall from '@/services/handleApiCall';
import { useProfileContext } from '@/contexts/ProfileContext';
import useAxiosAuth from './useAxiosAuth';

const useProfile = () => {
    const { profile, setProfile, isUpdate, setIsUpdate } = useProfileContext();
    const [isLoading, setIsLoading] = useState(true);
    const axios = useAxiosAuth();
    const fetchProfile = async () => {
        const res = await handleApiCall(axios.get('/user/profile'));
        setProfile(res?.data || null);
        setIsLoading(false);
        setIsUpdate(false);
    };

    useEffect(() => {
        fetchProfile();
    }, [isUpdate]);

    return { profile, isLoading, isUpdate, setIsUpdate };
};

export default useProfile;
