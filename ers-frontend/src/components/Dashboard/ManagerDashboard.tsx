// src/components/Dashboard/ManagerDashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagerDashboard.css';
import { useGlobalData } from '../../globalData/store';
import { Link } from 'react-router-dom';

interface ReimbursementRequest {
    reimbursementId: number;
    description: string;
    amount: number;
    status: string;
}

const ManagerDashboard = () => {
    const [requests, setRequests] = useState<ReimbursementRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { globalData } = useGlobalData();

    useEffect(() => {
        console.log("Fetching data with base URL:", globalData.baseUrl);
        setIsLoading(true);
        setError('');
        axios.get(`${globalData.baseUrl}/api/reimbursements`)
            .then(response => {
                console.log("Data fetched successfully:", response.data);
                setRequests(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch reimbursements', error);
                setError('Failed to load reimbursements.');
                setIsLoading(false);
            });
    }, [globalData.baseUrl]); // Ensure dependency is correct

    const handleApprove = async (reimbursementId: number) => {
        try {
            await axios.post(`${globalData.baseUrl}/api/reimbursements/approve/${reimbursementId}`);
            setRequests(requests.map(req => req.reimbursementId === reimbursementId ? { ...req, status: 'Approved' } : req));
        } catch (error) {
            console.error('Failed to approve reimbursement', error);
            setError(`Failed to approve reimbursement ID ${reimbursementId}`);
        }
    };

    const handleDeny = async (reimbursementId: number) => {
        try {
            await axios.post(`${globalData.baseUrl}/api/reimbursements/deny/${reimbursementId}`);
            setRequests(requests.map(req => req.reimbursementId === reimbursementId ? { ...req, status: 'Denied' } : req));
        } catch (error) {
            console.error('Failed to deny reimbursement', error);
            setError(`Failed to deny reimbursement ID ${reimbursementId}`);
        }
    };

    return (
        <div className="manager-dashboard">
            <h1>Manager Dashboard</h1>
            {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <ul>
                    {requests.map(request => (
                        <li key={request.reimbursementId}>
                            {request.description} - ${request.amount} - {request.status}
                            <button onClick={() => handleApprove(request.reimbursementId)}>Approve</button>
                            <button onClick={() => handleDeny(request.reimbursementId)}>Deny</button>
                        </li>
                    ))}
                </ul>
            )}
            <p className="register-link"><Link to="/logout">Logout</Link></p>
        </div>
    );
}

export default ManagerDashboard;
