// src/components/Reimbursement/ReimbursementListLoader.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { ReimbursementList } from './ReimbursementList';

const ReimbursementListLoader = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/api/reimbursements');
                setReimbursements(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <ReimbursementList reimbursements={reimbursements} />;
};

export default ReimbursementListLoader;
