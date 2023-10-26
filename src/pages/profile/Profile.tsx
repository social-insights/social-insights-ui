import React, { useState } from 'react';
import { Col, Container, Row } from "reactstrap";
import "./Profile.css";

export default function Profile() {

  return (
    <div className="profile-container">
        <div className="profile-picture"></div>
        <div className="user-info">
            <h1>First Name Last Name</h1>
            <p>@username</p>
            <p>Email: </p>
            <p>Organization</p>
            <p>Location: City, Country</p>
        </div>
    </div>
);
  };

