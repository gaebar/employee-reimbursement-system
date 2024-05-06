import React from 'react';
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import './ReimbursementList.css';

interface ReimbursementListProps {
    reimbursements: ReimbursementInterface[];
}

export const ReimbursementList: React.FC<ReimbursementListProps> = ({ reimbursements }) => {
    return (
        <div className="reimbursement-list">
            <h2>Reimbursement Requests</h2>
            {reimbursements.length > 0 ? (
                <ul>
                    {reimbursements.map((item, index) => (
                        <li key={index}>{item.description} - ${item.amount} ({item.status})</li>
                    ))}
                </ul>
            ) : (
                <p>No reimbursement requests to display.</p>
            )}
        </div>
    );
};
