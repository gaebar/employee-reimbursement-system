import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { ReimbursementForm } from '../Reimbursement/ReimbursementForm'; // Assicurati che il percorso sia corretto
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
                <ul>
                    {reimbursements.map((item, index) => (
                        <li key={index}>
                            {item.description} - ${item.amount} ({item.status})
                            {item.status === 'Pending' && <button>Edit</button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeDashboard;
