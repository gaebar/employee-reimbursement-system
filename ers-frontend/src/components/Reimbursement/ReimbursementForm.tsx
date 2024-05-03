import React, { useState } from 'react';
import axios from 'axios';
import './ReimbursementForm.css';

export const ReimbursementForm = () => {
    const [formData, setFormData] = useState({
        amount: '',
        description: ''
    });

    // Use a more general type for the event
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
            const response = await axios.post('http://localhost:8080/api/reimbursements', formData);
            alert('Reimbursement submitted successfully!');
            // Clear form or handle next steps
        } catch (error) {
            alert('Failed to submit reimbursement');
            console.error(error);
        }
    };

    return (
        <div className="form-container">  {/* Wrapper to center the form */}
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
    
    
};
