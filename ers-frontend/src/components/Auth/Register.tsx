// src/components/Auth/Register.tsx

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; 
import "./Auth.css";

export const Register: React.FC = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const response = await axios.post("http://localhost:8080/api/register", userData);
            setUser(response.data);
            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                alert("Username already in use. Please choose a different username.");
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="login">
            <div className="text-container">
                <h1>Create a New Account</h1>
                <h3>Join us to manage your reimbursements!</h3>
            </div>
            <div className="input-container">
                <FaUser className="icon" />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    aria-label="First Name"
                    onChange={handleChange}
                    required />
            </div>
            <div className="input-container">
                <FaUser className="icon" />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    onChange={handleChange}
                    required />
            </div>
            <div className="input-container">
                <FaUser className="icon" />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    aria-label="Username"
                    onChange={handleChange}
                    required />
            </div>
            <div className="input-container">
                <FaEnvelope className="icon" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    aria-label="Email"
                    onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaLock className="icon" />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={handleChange}
                    required />
            </div>
            <div className="input-container">
                <FaLock className="icon" />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    onChange={handleChange}
                    required />
            </div>
            <button className="login-button" onClick={handleRegister}>Sign Up</button>
            <p className="register-link">
                Have an account? <span onClick={() => navigate("/login")}>Log in</span>
            </p>
        </div>
    );
};

export default Register;
