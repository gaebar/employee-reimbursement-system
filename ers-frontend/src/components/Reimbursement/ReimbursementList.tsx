// ReimbursementList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface'; // Assicurati che il percorso sia corretto
import './ReimbursementList.css';

export const ReimbursementList = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reimbursements');
                setReimbursements(response.data);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Reimbursement Requests</h2>
            <ul>
                {reimbursements.map((item, index) => (
                    <li key={index}>{item.description} - ${item.amount} ({item.status})</li> // Aggiunto lo stato per completezza
                ))}
            </ul>
        </div>
    );
};
