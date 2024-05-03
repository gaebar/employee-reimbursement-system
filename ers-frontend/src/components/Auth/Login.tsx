import { useNavigate } from "react-router-dom";
import "./Login.css";
import { UserInterface } from "../../interfaces/UserInterface";
import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";  // Import icons from react-icons library

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
                    <FaUser className="icon" />  {/* Icon for username */}
                    <input type="text" placeholder="Username" name="username" onChange={storeValues} />
                </div>

                <div className="input-container">
                    <FaLock className="icon" />  {/* Icon for password */}
                    <input type="password" placeholder="Password" name="password" onChange={storeValues} />
                </div>

                <button className="login-button" onClick={login}>Login</button>
                <p className="register-link">Don't have an account? <span onClick={() => navigate("/register")}>Sign up</span></p>
            </div>
        </div>
    );
};
