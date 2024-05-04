// EmployeeDashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { ReimbursementForm } from '../Reimbursement/ReimbursementForm'; 
import { ReimbursementList } from '../Reimbursement/ReimbursementList';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reimbursements/user/1'); // Cambia con il tuo endpoint appropriato
                setReimbursements(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="employee-dashboard">
            <h1>Employee Dashboard</h1>
            <ReimbursementForm />
            <h2>Your Reimbursement Requests</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ReimbursementList reimbursements={reimbursements} />
            )}
        </div>
    );
};

export default EmployeeDashboard;
