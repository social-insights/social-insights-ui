import React, { useState } from "react";
import { useAuth } from "../../util/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

// TODO: Add option for phone number, add error messages, 
      // skip verification for now?
export default function SignUp() {
  let auth = useAuth();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPass] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  // const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhone(event.target.value);
  // }
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  }
  const handleSignUp = () => {
    auth.signUp(email, password, () => {
      navigate("/login", { replace: true });
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
            <input type="text"
            placeholder="Example@example.com"
            value={email}
            onChange={handleEmail}
            />
          </label>
          {/* <label> 
            Phone Number (Optional):
            <input type="text"
            placeholder="(XXX)-XXX-XXXX"
            value={phone}
            onChange={handlePhone}
            />
          </label> */}
          <label>
            Username:
            <input type="text" placeholder="Enter a username" />
          </label>
          <label>
            Password:
            <input type="password" 
            placeholder="Enter a password" 
            value={password}
            onChange={handlePass}
            />
          </label>
          <button type="button" onClick={handleSignUp}>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}