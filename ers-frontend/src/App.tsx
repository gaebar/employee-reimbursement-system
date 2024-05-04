import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ReimbursementForm } from './components/Reimbursement/ReimbursementForm';
import { ReimbursementList } from './components/Reimbursement/ReimbursementList';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';

import './App.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Function to check if user is authenticated
  const isAuthenticated = !!token;

  // Function to set user role
  const setUserRole = (role: string) => {
    setRole(role);
  };

  // Conditional rendering for main route
  const renderMainRoute = () => {
    if (isAuthenticated) {
      return role === 'manager' ? <Navigate to="/manager-dashboard" /> : <Navigate to="/employee-dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<Login setToken={setToken} setUserRole={setUserRole} />} />
          {/* Route for registration page */}
          <Route path="/register" element={<Register />} />
          {/* Route for employee dashboard */}
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          {/* Route for manager dashboard */}
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          {/* Route for reimbursement form */}
          <Route path="/reimbursement-form" element={<ReimbursementForm />} />
          {/* Route for reimbursement list */}
          <Route path="/reimbursement-list" element={<ReimbursementList />} />

          {/* Main route handling */}
          <Route path="/" element={renderMainRoute()} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
