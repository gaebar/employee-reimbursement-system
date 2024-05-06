// src/components/Dashboard/EmployeeDashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { ReimbursementForm } from '../Reimbursement/ReimbursementForm';
import { ReimbursementList } from '../Reimbursement/ReimbursementList';
import './EmployeeDashboard.css';
import { useGlobalData } from '../../globalData/store';

const EmployeeDashboard = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { globalData } = useGlobalData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = globalData.user?.userId; // Using global user data
                if (userId) {
                    const response = await axios.get(`${globalData.baseUrl}/api/reimbursements/user/${userId}`);
                    setReimbursements(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [globalData.user?.userId]); // Depend on global user ID

    return (
        <div className="employee-dashboard">
            <h1>Employee Dashboard</h1>
            <ReimbursementForm />
            <h2>Your Reimbursement Requests</h2>
            {isLoading ? <p>Loading...</p> : <ReimbursementList reimbursements={reimbursements} />}
        </div>
    );
};

export default EmployeeDashboard;
