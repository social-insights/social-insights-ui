import React from "react";
import { useAuth } from "../../util/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  let auth = useAuth();
  let navigate = useNavigate();

  const handleSignUp = () => {
    auth.signIn(() => {
      navigate("/dashboard", { replace: true });
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sign Up</h1>
        <form>
          <label> 
            First Name:
            <input type="text" placeholder="First Name"></input>
          </label>
          <label> 
            Last Name:
            <input type="text" placeholder="Last Name"></input>
          </label>
          <label> 
            Email:
            <input type="text" placeholder="Example@example.com"></input>
          </label>
          <label>
            Username:
            <input type="text" placeholder="Enter a username" />
          </label>
          <label>
            Password:
            <input type="password" placeholder="Enter a password" />
          </label>
          <button type="button" onClick={handleSignUp}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}