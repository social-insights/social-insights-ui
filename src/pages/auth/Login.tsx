import React from "react";
import { useAuth } from "../../util/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let auth = useAuth();
  let navigate = useNavigate();
  return (
    <>
      <button
        onClick={() =>
          auth.signIn(() => {
            navigate("/dashboard", { replace: true });
          })
        }
      >
        login
      </button>
    </>
  );
}
