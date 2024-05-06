import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { ReimbursementForm } from '../Reimbursement/ReimbursementForm';
import { ReimbursementList } from '../Reimbursement/ReimbursementList';
import './EmployeeDashboard.css';
import { useGlobalData } from '../../globalData/store';
import { Link, useNavigate } from "react-router-dom";

interface EmployeeDashboardProps {
    setUserRole: (role: string) => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ setUserRole }) => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { globalData } = useGlobalData();
    const navigate = useNavigate();

    // Define the function to fetch reimbursement data
    const fetchReimbursements = useCallback(async () => {
        setIsLoading(true);
        try {
            const userId = globalData.user?.userId;
            if (!userId) {
                setError('No user id available');
                setIsLoading(false);
                return;
            }
            
            const response = await axios.get<ReimbursementInterface[]>(`${globalData.baseUrl}/api/reimbursements/user/${userId}`);
            setReimbursements(response.data);
            setIsLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to fetch data', error.message);
                setError('Failed to fetch reimbursement requests.');
            } else {
                console.error('An unexpected error occurred', error);
                setError('An unexpected error occurred.');
            }
            setIsLoading(false);
        }
    }, [globalData.user?.userId, globalData.baseUrl]);

    useEffect(() => {
        fetchReimbursements();
    }, [fetchReimbursements]);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserRole(parsedUser.role);
            navigate(parsedUser.role === "manager" ? "/manager-dashboard" : "/employee-dashboard");
        }
    }, [setUserRole, navigate]);

    return (
        <div className="employee-dashboard">
            <h1>Employee Dashboard</h1>
            <ReimbursementForm onReimbursementSubmit={fetchReimbursements} />
            <h2>Your Reimbursement Requests</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ReimbursementList reimbursements={reimbursements} />
            )}
            <p className="register-link"><Link to="/logout">Logout</Link></p>
        </div>
    );
};

export default EmployeeDashboard;
