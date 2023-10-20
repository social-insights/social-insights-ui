import React from "react";
import { Routes, Route, Link, Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

// import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider, RequireAuth } from "./util/auth/AuthProvider";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Insights from "./pages/insights/Insights";
import ABTest from "./pages/posts/ABTest";
import SignUp from "./pages/auth/SignUp";
import LinkAccounts from "./pages/link/LinkAccounts";
import Posts from "./pages/posts/Posts";
import Reports from "./pages/reports/Reports";
import Organization from "./pages/organization/Organization";
import SelectOrg from "./pages/organization/SelectOrg";
import JoinOrg from "./pages/organization/JoinOrg";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/link" element={<LinkAccounts />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/ab" element={<ABTest />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/organization?code=:authCode" element={<Organization />} />
            <Route path="/organization/select" element={<SelectOrg />} />
            <Route path="/organization/join" element={<JoinOrg />} />
            {/* <Route
              path="/organization/invite/:invitationId"
              element={<AcceptInvite />}
            /> */}
          </Route>
          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route index path="/" element={<Landing />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
