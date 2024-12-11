'use client'

import { createContext, useState, ReactNode, useContext } from 'react';

interface ProfileContextType {
    profile: any | null;
    setProfile: (profile: any) => void;
    isUpdate: boolean;
    setIsUpdate: (update: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children, ...props }: { children: ReactNode } & any) => {
    const [profile, setProfile] = useState<any | null>(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const value = {
        profile,
        isUpdate,
        setProfile,
        setIsUpdate
    };

    return (
        <ProfileContext.Provider value={value} {...props}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfileContext must be used within a ProfileProvider');
    }
    return context;
};
