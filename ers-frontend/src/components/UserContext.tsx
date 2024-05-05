// src/components/UserContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: ReactNode;
}

// Creare un Context
export const UserContext = createContext<UserContextProps | undefined>(undefined);

// Creare un Provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Creare un Hook personalizzato per utilizzare il contesto dell'utente
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};