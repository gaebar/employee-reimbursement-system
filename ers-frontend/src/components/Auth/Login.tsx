import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserInterface } from "../../interfaces/UserInterface";
import { useState } from "react";
import axios from "axios";

interface LoginProps {
    setToken: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [user, setUser] = useState<UserInterface>({ username: "", password: "" });
    const navigate = useNavigate();

    const storeValues = (input: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = input.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const login = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/login", user, { withCredentials: true });
            alert(`Welcome, ${response.data.username}!`);
            setToken(response.data.accessToken);
            navigate("/dashboard");  // Navigate to the appropriate dashboard based on role
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
                    <input type="text" placeholder="username" name="username" onChange={storeValues} />
                </div>

                <div className="input-container">
                    <input type="password" placeholder="password" name="password" onChange={storeValues} />
                </div>

                <button className="login-button" onClick={login}>Login</button>
                <button className="login-button" onClick={() => navigate("/register")}>Create Account</button>
            </div>
        </div>
    );
};
