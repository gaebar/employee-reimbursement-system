// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard'; // Ensure this is uncommented only if the component is ready
import { UserProvider } from './components/UserContext'; // Import UserProvider
import './App.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const isAuthenticated = !!token;

  const renderMainRoute = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return role === 'manager' ? <Navigate to="/manager-dashboard" /> : <Navigate to="/employee-dashboard" />;
  };

  return (
    <div className='App'>
      <UserProvider> {/* Wrap components with UserProvider */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} setUserRole={setRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} /> {/* Uncomment this if ready */}
            <Route path="/" element={renderMainRoute()} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
