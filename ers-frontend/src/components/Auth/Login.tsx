import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { UserInterface } from "../../interfaces/UserInterface";
import { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa"; 

interface LoginProps {
    setToken: (token: string) => void;
    setUserRole: (role: string) => void; // Aggiungi la props setUserRole all'interfaccia LoginProps
}

export const Login: React.FC<LoginProps> = ({ setToken, setUserRole }) => {
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
            setUserRole(response.data.role); // Imposta il ruolo dell'utente
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
