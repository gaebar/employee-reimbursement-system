import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Auth/Login';
//import { Register } from './components/Auth/Register';
//import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
//import ManagerDashboard from './components/Dashboard/ManagerDashboard';
//import PrivateRoute from './utils/PrivateRoute';
import './App.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
    return (
      <div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<Login setToken={setToken} />} />
                {/* <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
                <Route path="/manager-dashboard" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} /> */}
            </Routes>
        </Router>
        </div>
    );
}

export default App;
