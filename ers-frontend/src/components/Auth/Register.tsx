// src/components/Auth/Register.tsx

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUserCircle, FaRegIdBadge, FaUser, FaEnvelope, FaLock, FaBriefcase } from "react-icons/fa"; // Importa l'icona per il ruolo
import "./Auth.css";

export const Register: React.FC = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        role: "employee" // Default role set as "employee"
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const { confirmPassword, ...userData } = user; // Exclude confirmPassword when sending to the server
            await axios.post("http://localhost:8080/users", userData);
            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed", error);
            alert("Registration failed. Please try again.");
        }
    };
    

    return (
        <div className="login">
            <div className="text-container">
                <h1>Create a New Account</h1>
                <h3>Join us to manage your reimbursements!</h3>
            </div>
            <div className="input-container">
                <FaRegUserCircle className="icon" />
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaRegIdBadge className="icon" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaUser className="icon" />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaEnvelope className="icon" />
                <input type="email" name="email" placeholder="Email (optional)" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaBriefcase className="icon" />
                <select name="role" onChange={handleChange} required>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                </select>
            </div>
            <div className="input-container">
                <FaLock className="icon" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="input-container">
                <FaLock className="icon" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            </div>
            <button className="login-button" onClick={handleRegister}>Sign Up</button>
            <p className="register-link">
                Have an account? <span onClick={() => navigate("/login")}>Log in</span>
            </p>
        </div>
    );
};

export default Register;
