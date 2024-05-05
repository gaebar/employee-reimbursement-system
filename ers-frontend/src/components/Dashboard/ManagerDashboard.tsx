// src/components/Dashboard/ManagerDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerDashboard.css';

// Define an interface for reimbursement requests
interface ReimbursementRequest {
    reimbursementId: number;
    description: string;
    amount: number;
    status: string;
}

const ManagerDashboard = () => {
    const [requests, setRequests] = useState<ReimbursementRequest[]>([]);

    useEffect(() => {
        // Fetch all reimbursement requests on component mount
        const fetchRequests = async () => {
            try {
                const response = await axios.get<ReimbursementRequest[]>('http://localhost:8080/api/reimbursements');  // Adjust the endpoint as necessary
                setRequests(response.data);
            } catch (error) {
                console.error('Failed to fetch reimbursements', error);
            }
        };

        fetchRequests();
    }, []);

    // Handles the approval of a reimbursement request
    const handleApprove = async (reimbursementId: number) => {
        try {
            await axios.post(`http://localhost:8080/api/reimbursements/approve/${reimbursementId}`);
            // Update local list of requests or re-fetch the data
            setRequests(requests.map(req => req.reimbursementId === reimbursementId ? { ...req, status: 'Approved' } : req));
        } catch (error) {
            console.error('Failed to approve reimbursement', error);
        }
    };

    // Handles the denial of a reimbursement request
    const handleDeny = async (reimbursementId: number) => {
        try {
            await axios.post(`http://localhost:8080/api/reimbursements/deny/${reimbursementId}`);
            // Update local list of requests or re-fetch the data
            setRequests(requests.map(req => req.reimbursementId === reimbursementId ? { ...req, status: 'Denied' } : req));
        } catch (error) {
            console.error('Failed to deny reimbursement', error);
        }
    };

    return (
        <div className="manager-dashboard">
            <h1>Manager Dashboard</h1>
            <ul>
                {requests.map(request => (
                    <li key={request.reimbursementId}>
                        {request.description} - ${request.amount} - {request.status}
                        <button onClick={() => handleApprove(request.reimbursementId)}>Approve</button>
                        <button onClick={() => handleDeny(request.reimbursementId)}>Deny</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManagerDashboard;
