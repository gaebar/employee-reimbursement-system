import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Reusing CSS from the Login component

interface UserInterface {
    username: string;
    password: string;
    email?: string;
}

export const Register: React.FC = () => {
    const [user, setUser] = useState<UserInterface>({ username: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            // Assuming your API endpoint for registering users
            const response = await axios.post("http://localhost:8080/api/register", user, { withCredentials: true });
            alert("Registration successful! You can now log in.");
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
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
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            </div>
            <div className="input-container">
                <input type="email" name="email" placeholder="Email (optional)" onChange={handleChange} />
            </div>
            <div className="input-container">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <div className="input-container">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            </div>
            <button className="login-button" onClick={handleRegister}>Register</button>
            <button className="login-button" onClick={() => navigate("/login")}>Back to Login</button>
        </div>
    );
};
