// src/components/Reimbursement/ReimbursementListLoader.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { ReimbursementList } from './ReimbursementList';

const ReimbursementListLoader = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.get('http://localhost:8080/api/reimbursements');
                setReimbursements(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setIsLoading(false);
                setError('Failed to load reimbursements. Please try again later.');
            }
        };
        fetchData();
    }, []); // Consider adding relevant dependencies here

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return <ReimbursementList reimbursements={reimbursements} />;
};

export default ReimbursementListLoader;
