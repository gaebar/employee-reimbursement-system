// src/globalData/store.ts

// src/globalData/store.ts

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

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [globalData, setGlobalData] = useState<GlobalData>({
        user: null,
        baseUrl: "http://localhost:8080"
    });

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
