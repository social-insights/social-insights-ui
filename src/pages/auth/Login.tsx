import React from "react";
import { useAuth } from "../../util/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file

export default function Login() {
  let auth = useAuth();
  let navigate = useNavigate();

  const handleLogin = () => {
    auth.signIn(() => {
      navigate("/dashboard", { replace: true });
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Social Insights</h1>
        <form>
          <label>
            Username:
            <input type="text" placeholder="Enter your username" />
          </label>
          <label>
            Password:
            <input type="password" placeholder="Enter your password" />
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
