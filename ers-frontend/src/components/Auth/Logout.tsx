// src/components/Auth/Logout.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user session or any global state if necessary
        sessionStorage.clear();
        
        // Optionally, reset any global state
        // setGlobalData({ user: null }); // Uncomment if you have a global state management like Context API

        // Redirect to login or home page
        navigate('/login');
    }, [navigate]);

    return (
        <div className="logout">
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;
