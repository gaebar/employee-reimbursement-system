// ReimbursementList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import './ReimbursementList.css';



export const ReimbursementList = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reimbursements');
                setReimbursements(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Reimbursement Requests</h2>
            <ul>
                {reimbursements.map((item, index) => (
                    <li key={index}>{item.description} - ${item.amount} ({item.status})</li>
                ))}
            </ul>
        </div>
    );
};
