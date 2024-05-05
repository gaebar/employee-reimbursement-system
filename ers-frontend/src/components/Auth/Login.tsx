// Login.tsx

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa"; 
import "./Auth.css";

interface LoginProps {
    setToken: (token: string) => void;
    setUserRole: (role: string) => void;
}

export const Login: React.FC<LoginProps> = ({ setToken, setUserRole }) => {
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/login", user);
            alert(`Welcome, ${response.data.username}!`);
            setToken(response.data.accessToken);
            setUserRole(response.data.role);  // Assume role is part of the response
            navigate("/dashboard");
        } catch (error) {
            alert("Login Failed!");
        }
    };

    return (
        <div className="login">
            <div className="text-container">
                <h1>Welcome to the Employee Reimbursement System</h1>
                <h3>Sign in to manage your reimbursements!</h3>
                <div className="input-container">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        aria-label="Username"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange} />
                </div>
                <div className="input-container">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        aria-label="Password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange} />
                </div>
                <button className="login-button" onClick={login}>Login</button>
                <p className="register-link">Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span></p>
            </div>
        </div>
    );
};
