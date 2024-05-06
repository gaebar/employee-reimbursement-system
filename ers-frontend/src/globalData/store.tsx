// src/globalData/store.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    userId?: number;
    username?: string;
    role?: string;
}

interface GlobalData {
    user: User | null;
    baseUrl: string;
}

interface GlobalDataContextType {
    globalData: GlobalData;
    setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>;
}

const defaultState: GlobalData = {
    user: null,
    baseUrl: "http://localhost:8080"
};

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [globalData, setGlobalData] = useState<GlobalData>(defaultState);

    return (
        <GlobalDataContext.Provider value={{ globalData, setGlobalData }}>
            {children}
        </GlobalDataContext.Provider>
    );
};

export const useGlobalData = (): GlobalDataContextType => {
    const context = useContext(GlobalDataContext);
    if (!context) {
        throw new Error('useGlobalData must be used within a GlobalDataProvider');
    }
    return context;
};
