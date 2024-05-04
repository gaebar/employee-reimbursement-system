// ReimbursementList.tsx

import React from 'react';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import './ReimbursementList.css';

interface ReimbursementListProps {
    reimbursements: ReimbursementInterface[];
}

export const ReimbursementList: React.FC<ReimbursementListProps> = ({ reimbursements }) => {
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
