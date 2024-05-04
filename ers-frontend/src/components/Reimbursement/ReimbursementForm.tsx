// ReimbursementForm component is a form that allows users to submit a reimbursement request. 

import React, { useState } from 'react';
import axios from 'axios';
import { FaMoneyBillAlt, FaAlignLeft } from 'react-icons/fa'; // Importa le icone necessarie
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
                <p>Ensure all details are complete for prompt processing.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaMoneyBillAlt className="icon" />
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Amount"
                            required
                            min="1"
                            step="1"
                        />
                    </div>
                    <div className="input-container">
                        <FaAlignLeft className="icon" />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
