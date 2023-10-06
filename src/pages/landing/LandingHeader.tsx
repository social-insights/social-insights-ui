import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Col,
  Container,
  Row
} from "reactstrap";

import "../../components/Header.scss";

export default function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = false;

  
  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <nav>
      <Navbar dark color="dark" expand="md" container="fluid">
        <NavbarBrand href="/dashboard">
          <img
            alt="logo"
            src={require("../../images/logo_720.webp")}
            style={{
              height: 40,
            }}
          />
        </NavbarBrand>
        {/* TODO: If logged in, allow for nav to dashboard */}
        
        <NavbarToggler onClick={toggleNav} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto text-size-" navbar>
            <NavItem>
              <NavLink href="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
          </Nav>

        </Collapse>
      </Navbar>
    </nav>
    // <Container className="vh-100 p-4" fluid>
    // </Container>
  );
}