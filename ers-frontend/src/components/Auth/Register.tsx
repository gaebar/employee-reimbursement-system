import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importa le icone da react-icons
import "./Auth.css"; // Reusing CSS from the Login component

interface UserInterface {
    username: string;
    password: string;
    email?: string;
}

export const Register: React.FC = () => {
    const [user, setUser] = useState<UserInterface>({ username: "", password: "", email: "" });
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
                <FaUser className="icon" /> {/* Icon for username */}
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaEnvelope className="icon" /> {/* Icon for email */}
                <input type="email" name="email" placeholder="Email (optional)" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaLock className="icon" /> {/* Icon for password */}
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <div className="input-container">
                <FaLock className="icon" /> {/* Icon for confirm password */}
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            </div>
            <button className="login-button" onClick={handleRegister}>Sign Up</button>
            {/* <button className="login-button" onClick={() => navigate("/login")}>Back to Login</button> */}
            <p className="register-link">
                    Have an account? <span onClick={() => navigate("/login")}>Log in</span>
                </p>
        </div>
    );
};
