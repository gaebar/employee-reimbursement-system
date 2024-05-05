// ReimbursementForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { FaMoneyBillAlt, FaAlignLeft } from 'react-icons/fa';
import './ReimbursementForm.css';

export const ReimbursementForm = () => {
    const [formData, setFormData] = useState({
        amount: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/reimbursements', formData);
            alert('Reimbursement submitted successfully!');
            setFormData({ amount: '', description: '' }); // Reset form fields
        } catch (error) {
            alert('Failed to submit reimbursement');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <h1>Submit Your Reimbursement Request</h1>
                <p>Fill out the form below.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaMoneyBillAlt className="icon" />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            min="1"
                            step="1"
                        />
                    </div>
                    <div className="input-container">
                        <FaAlignLeft className="icon" />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
