import React, { useState } from "react";
import { useAuth } from "../../util/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Input, Button, FormFeedback } from "reactstrap";

export default function Login() {
  let auth = useAuth();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  // const [username, setUser] = useState("");


  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  }
  // const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser(event.target.value);
  // }


  const handleLogin = () => {
    // console.log("Email", email);
    // console.log("password", password);
    auth.signIn(email, password, () => {
      navigate("/dashboard", { replace: true });
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Social Insights</h1>
        <form>
          <label>
            Email:
            <Input type="text" 
            placeholder="Enter your email" 
            autoFocus
            value={email}
            onChange={handleEmail}
            // invalid={}
            />
          </label>
          {/* {inputError !== "" && (
                <FormFeedback valid={false}>{inputError}</FormFeedback>
          )} */}
          <label>
            Password:
            <Input type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={handlePass}
            />
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
