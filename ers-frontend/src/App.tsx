import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ReimbursementForm } from './components/Reimbursement/ReimbursementForm';
import { ReimbursementList } from './components/Reimbursement/ReimbursementList';


// import PrivateRoute from './utils/PrivateRoute'; // Utilizza questo se vuoi proteggere le route
import './App.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reimbursement-form" element={<ReimbursementForm />} />
          <Route path="/reimbursement-list" element={<ReimbursementList />} />
          {/* Le seguenti route possono essere protette con PrivateRoute se necessario
          <Route path="/dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
          <Route path="/manager-dashboard" element={<PrivateRoute><ManagerDashboard /></PrivateRoute>} />
          */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
