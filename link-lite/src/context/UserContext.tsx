import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authApiHandler from '../services/authApiHandler';

type User = {
    id: number;
    username: string;
    email: string;
}

type UserContextType = {
    user: User | null;
    loading: Boolean;
    saveUser: (userData: User) => void;
    clearUser: () => void;
}

type UserProviderProp = {
    children: ReactNode
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProp> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    setLoading(false);
                    return;
                }
                const savedUser = localStorage.getItem('user');
                if(savedUser && savedUser !== "undefined") {
                    setUser(JSON.parse(savedUser));
                } else {
                    const response = await authApiHandler.getUserData();
                    if(response && response.data) {
                        setUser(response.data);
                        localStorage.setItem('user', JSON.stringify(response.data))
                    }
                };
            } catch(err) {
                console.error('Error during user fetching', err);
            } finally {
                setLoading(false)
            }
        }
        fetchUser();
    }, []);

    const saveUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    return (
        <UserContext.Provider value={{ user, loading, saveUser, clearUser }}>
        {children}
      </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error('useUser must be used within a UserProvider');
    };
    return context;
}