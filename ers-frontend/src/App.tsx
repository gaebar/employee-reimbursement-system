// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import { Register } from './components/Auth/Register';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import { UserProvider } from './components/UserContext'; // This can eventually be replaced or integrated with GlobalData
import './App.css'; 

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  const isAuthenticated = true;

  const renderMainRoute = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return role === 'manager' ? <Navigate to="/manager-dashboard" /> : <Navigate to="/employee-dashboard" />;
  };

  return (
    <div className='App'>
      <UserProvider> {/* Continue using UserProvider for now */}
        <Router>
          <Routes>
            <Route path="/login" element={<Login setUserRole={setRole} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/" element={renderMainRoute()} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
